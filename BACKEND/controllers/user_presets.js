const { matchedData } = require("express-validator");
const { userPresetsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener lista de grabaciones de la BBDD
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await userPresetsModel.findAll({}); 
        res.send({ data,  user });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * Obtener un elemento concreto de la BDD
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {usPresetID} = req;
        const data = await userPresetsModel.findOne({ where: {usPresetID} });
        res.send({ data });
    } catch(e) {
        handleHttpError(res,"ERROR_GET_ITEM")
    }
};

/**
 * Insertar un registro de grabacion
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    //try {
        const body = matchedData(req);
        console.log(body);
        const data = await userPresetsModel.create(body);
        res.status(201);
        res.send({ data });
    /*} catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }*/
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) => {};

/**
 * Eliminar un registro de grabacion
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) => {};


module.exports = {getItem, getItems, createItem, updateItem, deleteItem};