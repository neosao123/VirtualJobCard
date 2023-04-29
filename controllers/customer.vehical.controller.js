const { default: mongoose } = require("mongoose");
const CustomerModel = require("../models/Customer.model");
const VehicleModel = require("../models/Vehical.model");


let TelRegex = /^\d{10}$/
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let vehicalRegNoRegex = /^[A-Z0-9_]+$/


exports.create = async (req, res) => {
    try {
        const {
            cname,
            caddress,
            mobileTeleNumber,
            homeTeleNumber,
            officeTeleNumber,
            cemail,
            drivenBy,
            others,
        } = req.body;
        const {
            vehicleRegNo,
            modelYear,
            modelCode,
            vinNo,
            colorCode,
            saleNumber,
            sscScInfo,
            egNumber,
            dlrNo,
            opNo,
            completedOpNo,
        } = req.body;

        const vehicleExist = await VehicleModel.findOne({ vehicleRegNo });
        if (vehicleExist) {
            return res
                .status(300)
                .json({ err: 300, msg: "Vehicle already exists" });
        }

        // validations for customer - 
        if (cname?.trim() === "" || cname === undefined) {
            return res.status(300).json({ err: 300, msg: "Customer name is required" })
        }
        if (caddress?.trim() === "" || caddress === undefined) {
            return res.status(300).json({ err: 300, msg: "Customer Address is required" })
        }

        if (!TelRegex.test(mobileTeleNumber)) {
            return res.status(300).json({ err: 300, msg: "Invalid Mobile number" })
        }
        if (!TelRegex.test(homeTeleNumber)) {
            return res.status(300).json({ err: 300, msg: "Invalid home Tele number" })
        }
        if (!TelRegex.test(officeTeleNumber)) {
            return res.status(300).json({ err: 300, msg: "Invalid officeTele number" })
        }
        if (!emailRegex.test(cemail)) {
            return res.status(300).json({ err: 300, msg: "Invalid Email" })
        }

        const newCustomer = await new CustomerModel({
            cname,
            caddress,
            mobileTeleNumber,
            homeTeleNumber,
            officeTeleNumber,
            cemail,
            drivenBy,
            others,
        }).save();


        // validations for vehical model

        if (!vehicalRegNoRegex.test(vehicleRegNo)) {
            return res.status(300).json({ err: 300, msg: "Invalid vehicle registration number" });
        }

        if (isNaN(modelYear) || modelYear < 1900 || modelYear > new Date().getFullYear()) {
            return res.status(300).json({ err: 300, msg: "Invalid model year" });
        }

        if (modelCode.trim() === undefined || modelCode.trim() === null) {
            return res.status(300).json({ err: 300, msg: "model code required" });
        }

        if (vinNo.trim().length !== 17) {
            return res.status(300).json({ err: 300, msg: "Invalid VIN number" });
        }

        if (saleNumber && saleNumber.trim().length > 10) {
            return res.status(300).json({ err: 300, msg: "Sale number cannot exceed 10 characters" });
        }

        if (sscScInfo && sscScInfo.trim().length > 20) {
            return res.status(300).json({ err: 300, msg: "SSC/SC Info cannot exceed 20 characters" });
        }

        if (egNumber && egNumber.trim().length > 10) {
            return res.status(300).json({ err: 300, msg: "EG number cannot exceed 10 characters" });
        }

        if (dlrNo && dlrNo.trim().length > 10) {
            return res.status(300).json({ err: 300, msg: "DLR number cannot exceed 10 characters" });
        }

        if (opNo && opNo.trim().length > 10) {
            return res.status(300).json({ err: 300, msg: "OP number cannot exceed 10 characters" });
        }

        if (completedOpNo && completedOpNo.trim().length > 10) {
            return res.status(300).json({ err: 300, msg: "Completed OP number cannot exceed 10 characters" });
        }

        // validations for customer model
        if (cname.trim().length < 3 || cname.trim().length > 50) {
            return res.status(300).json({ err: 300, msg: "Invalid customer name" });
        }

        if (caddress.trim().length < 3 || caddress.trim().length > 100) {
            return res.status(300).json({ err: 300, msg: "Invalid customer address" });
        }
        if (isNaN(mobileTeleNumber) || mobileTeleNumber.toString().length !== 10) {
            return res.status(300).json({ err: 300, msg: "Invalid mobile telephone number" });
        }
        if (homeTeleNumber !== "") {
            if (!TelRegex.test(homeTeleNumber)) {
                return res.status(300).json({ err: 300, msg: "Invalid home Tele number" })
            }
        }
        if (officeTeleNumber !== "") {
            if (!TelRegex.test(officeTeleNumber)) {
                return res.status(300).json({ err: 300, msg: "Invalid officeTele number" })
            }
        }
        if (!emailRegex.test(cemail.trim())) {
            return res.status(300).json({ err: 300, msg: "Invalid email address" });
        }
        if (drivenBy === "others" && others.trim().length < 3) {
            return res.status(300).json({ err: 300, msg: "Invalid email address" });
        }

        const newVehicle = await new VehicleModel({
            customerId: newCustomer._id,
            vehicleRegNo,
            modelYear,
            modelCode,
            vinNo,
            colorCode,
            saleNumber,
            sscScInfo: "",
            egNumber,
            dlrNo,
            opNo,
            completedOpNo,
        }).save();

        const response = {
            err: 201,
            msg: "Info added successfully",
            newVehicle: newVehicle.toJSON(),
            newCustomer: newCustomer.toJSON(),
        };
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 500, msg: "Internal server err", err: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const { customerId } = req.body;
        const customer = await CustomerModel.findByIdAndDelete(
            new mongoose.Types.ObjectId(customerId)
        );
        if (!customer) {
            return res
                .status(404)
                .json({ err: 404, msg: "Customer not found" });
        }
        const vehicle = await VehicleModel.findByIdAndDelete(
            new mongoose.Types.ObjectId(customer.vehicalId)
        );
        const response = {
            err: 200,
            msg: "Info deleted successfully",
        };
        res.status(200).json(response);
    } catch (err) {
        console.err(err);
        res.status(500).json({ err: 500, msg: "Internal server err" });
    }
};

exports.update = async (req, res) => {
    try {
        const { vehicleId, customerId } = req.body;
        const { cname, caddress, mobileTeleNumber, homeTeleNumber, officeTeleNumber, cemail, drivenBy, others } = req.body;
        // validations for customer - 
        if (cname?.trim() === "" || cname === undefined) {
            return res.status(300).json({ err: 300, msg: "Customer name is required" })
        }
        if (caddress?.trim() === "" || caddress === undefined) {
            return res.status(300).json({ err: 300, msg: "Customer Address is required" })
        }
        if (!TelRegex.test(mobileTeleNumber)) {
            return res.status(300).json({ err: 300, msg: "Invalid Mobile number" })
        }
        if (homeTeleNumber !== "") {
            if (!TelRegex.test(homeTeleNumber)) {
                return res.status(300).json({ err: 300, msg: "Invalid home Tele number" })
            }
        }
        if (officeTeleNumber !== "") {
            if (!TelRegex.test(officeTeleNumber)) {
                return res.status(300).json({ err: 300, msg: "Invalid officeTele number" })
            }
        }
        if (!emailRegex.test(cemail)) {
            return res.status(300).json({ err: 300, msg: "Invalid Email" })
        }
        const customer = await CustomerModel.findOneAndUpdate(new mongoose.Types.ObjectId(customerId), { cname, caddress, mobileTeleNumber, homeTeleNumber, officeTeleNumber, cemail, drivenBy, others }).then((result) => {
            return res.status(201).json({ err: 201, msg: "Customer updated successfully" });
        }).catch((err) => {
            return res.status(301).json({ err: 301, msg: err, })
        });
    } catch (err) {
        console.err(err);
        res.status(500).json({ msg: err.msg });
    }
};

// get Info by vehical number - 
exports.getInfo = async (req, res) => {
    const { vehicleRegNo, vehicalId } = req.body;
    await VehicleModel.findOne({ vehicleRegNo: vehicleRegNo })
        .populate('customerId')
        .then((result) => {
            if (result) {
                let vehicalInfo = {
                    vehicleRegNo: result.vehicleRegNo,
                    modelYear: result.modelYear,
                    modelCode: result.modelCode,
                    vinNo: result.vinNo,
                    colorCode: result.colorCode,
                    saleNumber: result.saleNumber,
                    sscScInfo: result.sscScInfo,
                    egNumber: result.egNumber,
                    dlrNo: result.dlrNo,
                    opNo: result.opNo,
                    completedOpNo: result.completedOpNo,
                    customerInfo: result.customerId
                }
                res.json({ err: 201, msg: "Info found successfully", data: vehicalInfo });
            } else {
                console.log("No matching customer found");
                res.status(300).send({ err: 300, msg: "Vehical Not Found" });
            }
        })
};


exports.truncate = async (req, res) => {
    await CustomerModel.deleteMany()
    await VehicleModel.deleteMany()
    res.status(200).json({ err: 200, msg: "Data truncated" });
}