const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require("../validators/recordings");
const { 
    getItems, 
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/recordings");


router.get("/", getItems);

router.get("/:recordID", validatorGetItem, getItem);

router.post("/", validatorCreateItem, createItem);

router.put("/update/:recordID", updateItem);

router.delete("/:recordID", validatorGetItem, deleteItem);

module.exports = router;