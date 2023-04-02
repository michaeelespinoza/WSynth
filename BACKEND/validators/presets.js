const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("categoryID")
    .exists()
    .notEmpty(),
    check("presetName")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validatorGetItem = [
    check("PresetID")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

/*const validatorUpdateItem = [
    check("recordID")
    .exists()
    .notEmpty(),
    check("recName")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];*/

module.exports = { validatorCreateItem , validatorGetItem};