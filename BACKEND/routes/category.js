const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require("../validators/category");
const { 
    getItems, 
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/category");


router.get("/", getItems);

router.get("/:categoryID", validatorGetItem, getItem);

router.post("/", validatorCreateItem, createItem);

router.put("/update/:categoryID", updateItem);

router.delete("/:categoryID", validatorGetItem, deleteItem);

module.exports = router; 