const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const itemsDB = require("../fakeDB");

router.get("/", function (req, res) {
    return res.json({
        itemsDB
    });
});

router.post("/", function (req, res) {
    const newItem = {
        name: req.body.name,
        price: req.body.price
    };
    itemsDB.push(newItem);
    return res.status(201).json({
        added: newItem
    });
});

router.get("/:name", function (req, res) {
    const foundItem = itemsDB.find(item => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found.", 404);
    } else {
        return res.json({
            name: foundItem.name,
            price: foundItem.price
        });
    }
});

router.patch("/:name", function (req, res) {
    const foundItem = itemsDB.find(item => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found.", 404);
    } else {
        foundItem.name = req.body.name;
        foundItem.price = req.body.price;
        return res.json({
            name: foundItem.name,
            price: foundItem.price
        });
    }
});

router.delete("/:name", function (req, res) {
    const foundItem = itemsDB.find(item => item.name === req.params.name);
    if (foundItem === -1) {
        throw new ExpressError("Item not found.", 404);
    } else {
        itemsDB.splice(foundItem, 1);
        return res.json({
            message: "Deleted"
        });
    }
});

module.exports = router;