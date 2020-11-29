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

router.delete("/offering/:userid/:id", auth, async (req, res) => {
  const itemId = req.params.id;
  const userId = req.params.userid;
  try {
    const item = await ItemOffering.findByIdAndDelete(itemId, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Cannot delete", status: "400" });
      } else {
        // get user.wanted
        const offeredItems = (await User.findById({ _id: userId })).offering;
        // remove item to "delete"
        const amendedItems = offeredItems.filter(
          (item) => item._id.toString() !== itemId
        );

        await User.findByIdAndUpdate(
          userId,
          { offering: amendedItems },
          (err) => {
            if (err) {
              return res
                .status(400)
                .json({ message: "Cannot delete", status: "400" });
            } else {
              return res
                .status(200)
                .json({ message: "Item deleted", status: "200", id: itemId });
            }
          }
        );
      }
    });
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

router.delete("/wanted/:userid/:id", auth, async (req, res) => {
  const itemId = req.params.id;
  const userId = req.params.userid;
  console.log("itemId", itemId);
  try {
    const item = await ItemWanted.findByIdAndDelete(itemId, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Cannot delete", status: "400" });
      } else {
        // get user.wanted
        const wantedItems = (await User.findById({ _id: userId })).wanted;
        // remove item to "delete"
        const amendedItems = wantedItems.filter(
          (item) => item._id.toString() !== itemId
        );

        await User.findByIdAndUpdate(
          userId,
          { wanted: amendedItems },
          (err) => {
            if (err) {
              return res
                .status(400)
                .json({ message: "Cannot delete", status: "400" });
            } else {
              return res
                .status(200)
                .json({ message: "Item deleted", status: "200", id: itemId });
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/allwanted", async (req, res) => {
  await ItemWanted.find({}, (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Cannot get wanted items", status: "400" });
    } else {
      return res
        .status(200)
        .json({ message: "All Wanted Items", status: "200", wanted: result });
    }
  });
});

module.exports = router;
