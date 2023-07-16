const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("username")
    .exists()
    .notEmpty(),
    check("nombre")
    .exists()
    .notEmpty(),
    check("apellido")
    .exists()
    .notEmpty(),
    check("edad")
    .exists()
    .notEmpty(),
    check("correo")
    .exists()
    .notEmpty()
    .isEmail(),
    check("passwd")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorLogin = [
    check("passwd")
    .exists(),
    check("correo")
    .isEmail()
    .normalizeEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorRegister, validatorLogin};
