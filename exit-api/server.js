const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Exit = require("./models/Exit");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("MongoDB povezan"))
.catch(err => {
    console.error(err);
});

app.get("/", (req, res) => {
    res.send("Exit API radi!");
});

app.get("/exits", async (req, res) => {
    try {
        const exits = await Exit.find().sort({ createdAt: -1 });
        res.json(exits);
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

app.post("/exits", async (req, res) => {
    try {
        const exit = new Exit(req.body);

        await exit.save();

        res.json({
            success: true
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
});