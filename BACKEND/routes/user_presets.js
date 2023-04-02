const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require("../validators/user_presets");
const { 
    getItems, 
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/user_presets");


router.get("/", getItems);

router.get("/:usPresetID", validatorGetItem, getItem);

router.post("/", validatorCreateItem, createItem);

router.put("/update/:usPresetID", updateItem);

router.delete("/:usPresetID", validatorGetItem, deleteItem);

module.exports = router;