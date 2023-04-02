const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require("../validators/presets");
const { 
    getItems, 
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/presets");


router.get("/", getItems);

router.get("/:PresetID", validatorGetItem, getItem);

router.post("/", validatorCreateItem, createItem);

router.put("/update/:PresetID", updateItem);

router.delete("/:PresetID", validatorGetItem, deleteItem);

module.exports = router;  