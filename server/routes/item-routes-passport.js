const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../middleware/passport-setup");
const ItemOffering = require("../models/Offering");

router.get(
  "/offering",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    ItemOffering.find({ user: req.user._id }).then((items) =>
      res.status(200).json({ items })
    );
  }
);

router.post(
  "/offering",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const newOffer = new ItemOffering({
      name: req.body.name,
      user: req.user._id,
    });
    console.log(req.user._id);

    const item = newOffer.save((err, item) => {
      if (err) {
        res.status(503).json({
          message: "Error occurred while saving. Please try again",
          status: "503",
        });
      } else {
        //await req.user.offering.push(newOffer);

        // const savedItem = await req.user.save();

        res.status(201).json({
          message: "Item successfully created",
          status: "201",
          item,
        });
      }
    });
  }
);

router.delete(
  "/offering/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
      res.status(200).json({ message: "Item deleted", id });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
