const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {
    try {
        const { userName, email, password, role, phoneNumber } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(300).json({ err: 300, msg: 'User already exists' });
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // validation 
        if (phoneNumber === undefined) {
            return res.status(300).json({ err: 300, msg: "Phone number required" })
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid phone number" });
        } if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid email" });
        }
        if (email === undefined || email === "") {
            return res.status(300).json({ err: 300, msg: "Please enter email" });
        }
        if (password === undefined || password === "") {
            return res.status(300).json({ err: 300, msg: "Please enter password" });
        }
        const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,}$/
        if (!passregex.test(password)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid password" });
        }
        // Create user
        const user = new User({
            IP: req.connection.remoteAddress,
            userName,
            email,
            password: hashedPassword,
            role,
            phoneNumber
        });
        await user.save();
        // Generate JWT
        const token = jwt.sign({ _id: user._id }, config.SECRETE_KEY, { expiresIn: '24d' });
        res.status(201).json({ err: 201, msg: `User registered successfully`, data: user, token });
    } catch (err) {
        res.status(500).json({ msg: err.msg });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ err: 400, msg: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, config.SECRETE_KEY, { expiresIn: '24d' });
    res.status(201).json({ err: 201, msg: "Logged in successfully", data: user, token });
};
