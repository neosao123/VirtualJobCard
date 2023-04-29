const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./db/connect');
const routes = require("./routes/index.routes")
const app = express();

app.get("/", (req, res) => {
    res.send("Server is running");
})
// Middleware
app.use(bodyParser.json());

// Routes
app.use(routes);

// Start server and connectDB
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
