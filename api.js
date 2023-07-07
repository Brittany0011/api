const express = require("express");
const router = express.Router();
const fs = require("fs");
const StoredData = require("./storedDataSchema");

router.get("/realtime", async (req, res) => {
  try {
    const localData = await fs.promises.readFile("realtimeData.json");
    const realtimeData = JSON.parse(localData.toString());
    console.log("已傳送實時數據", realtimeData);
    res.send(realtimeData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/storedData/pre7Day", async (req, res) => {
  try {
    const storedData = await StoredData.find().sort({id: -1}).limit(7).skip(1);
    console.log("數據已傳送", storedData);
    res.json(storedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})
router.get("/storedData/specificDate", async (req, res) => {
  try {
    const storedData = await StoredData.find({date: req.query.date});
    console.log("數據已傳送", storedData);
    res.json(storedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;
