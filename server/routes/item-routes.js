const router = require("express").Router();
const ItemOffering = require("../models/Offering");

router.get("/offering", (req, res) => {
  ItemOffering.find().then((items) => res.status(200).json({ items }));
});

router.post("/offering", async (req, res) => {
  const newOffer = new ItemOffering({
    name: req.body.name,
  });
  try {
    const item = await newOffer.save((err, item) => {
      if (err) {
        res.status(503).json({
          message: "Error occurred while saving. Please try again",
          status: "503",
        });
      } else {
        res
          .status(201)
          .json({ message: "Item successfully created", status: "201", item });
      }
      return item;
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/offering/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await ItemOffering.findById(id);
    if (!item) {
      res.status(404).json({ message: "Item not found", id });
    }
    const deletedItem = await item.remove();
    if (!deletedItem) {
      res.status(400).json({ message: "Something went wrong. Try again" });
    }
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
