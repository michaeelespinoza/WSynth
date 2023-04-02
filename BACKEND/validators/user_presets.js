const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("usUserID")
    .exists()
    .notEmpty(),
    check("presetName")
    .exists()
    .notEmpty(),
    check("oscillator_type")
    .exists()
    .notEmpty(),
    check("amplitude")
    .exists()
    .notEmpty(),
    check("decay") 
    .exists()
    .notEmpty(),
    check("sustain") 
    .exists()
    .notEmpty(),
    check("releasee") 
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validatorGetItem = [
    check("usPresetID")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorCreateItem , validatorGetItem};