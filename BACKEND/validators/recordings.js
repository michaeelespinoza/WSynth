const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("recUserID")
    .exists()
    .notEmpty(),
    check("recName")
    .exists()
    .notEmpty(),
    check("recDuration")
    .exists()
    .notEmpty(),
    check("recSize")
    .exists()
    .notEmpty(),
    check("ruta") 
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validatorGetItem = [
    check("recordID")
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