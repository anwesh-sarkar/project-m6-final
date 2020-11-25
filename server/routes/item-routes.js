const router = require("express").Router();
const auth = require("../middleware/auth-middleware");
const ItemOffering = require("../models/Offering");
const ItemWanted = require("../models/Wanted");
const User = require("../models/User");

// Offered Item routes
router.get("/offering/:userId", auth, async (req, res) => {
  console.log(req.params.userId);
  await ItemOffering.find({ user: req.params.userId })
    .then((items) => res.status(200).json({ items }))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Items not found", status: "404" });
    });
});

router.post("/offering", auth, async (req, res) => {
  const newOffer = new ItemOffering({
    name: req.body.name,
    user: req.body.user,
  });

  const item = await newOffer.save(async (err, item) => {
    if (err) {
      res.status(503).json({
        message: "Error occurred while saving. Please try again",
        status: "503",
      });
    } else {
      const user = await User.findById({ _id: item.user });

      user.update(
        { $push: { offering: item } },
        { upsert: true },
        (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ message: "Could not save", status: "400" });
          } else {
            return res.status(201).json({
              message: "Item successfully created",
              status: "201",
              item,
            });
          }
        }
      );
    }
  });
});

router.delete("/offering/:id", auth, async (req, res) => {
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
});

// Wanted Item routes
router.get("/wanted/:userId", auth, async (req, res) => {
  await ItemWanted.find({ user: req.params.userId })
    .then((items) => res.status(200).json({ items }))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Items not found", status: "404" });
    });
});

router.post("/wanted", auth, async (req, res) => {
  const newWanted = new ItemWanted({
    name: req.body.name,
    user: req.body.user,
  });
  console.log(req.body.user);

  const item = await newWanted.save(async (err, item) => {
    if (err) {
      res.status(503).json({
        message: "Error occurred while saving. Please try again",
        status: "503",
      });
    } else {
      const user = await User.findById({ _id: item.user });

      user.update({ $push: { wanted: item } }, { upsert: true }, (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Could not save", status: "400" });
        } else {
          return res.status(201).json({
            message: "Item successfully created",
            status: "201",
            item,
          });
        }
      });
    }
  });
});

router.delete("/wanted/:id", auth, async (req, res) => {
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
});

router.get("/alloffered", async (req, res) => {
  await ItemOffering.find({}, (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Cannot get offered items", status: "400" });
    } else {
      return res
        .status(200)
        .json({ message: "All Offered Items", status: "200", offered: result });
    }
  });
});

module.exports = router;
