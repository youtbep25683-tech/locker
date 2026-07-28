require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PASSWORD = process.env.PASSWORD;

// Health Check
app.get("/", (req, res) => {
    res.json({
        status: "online"
    });
});

// Verify Password
app.post("/verify", (req, res) => {

    const { password } = req.body;

    if (!password)
        return res.status(400).json({
            success: false,
            message: "Password Required"
        });

    if (password === PASSWORD)
        return res.json({
            success: true
        });

    return res.status(401).json({
        success: false,
        message: "Wrong Password"
    });

});

app.listen(process.env.PORT || 3000, () => {
    console.log("API Running...");
});
