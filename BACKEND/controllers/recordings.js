const { matchedData } = require("express-validator");
const { recordingsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener lista de grabaciones de la BBDD
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await recordingsModel.findAll({}); 
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
        const {recordID} = req;
        const data = await recordingsModel.findOne({ where: {recordID} });
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
    try {
        const body = matchedData(req);
        const data = await recordingsModel.create(body);
        res.status(201);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        //const {recordID, recName} = matchedData(req);
        const recordID = req.params.recordID;
        const updates = req.body;
        const data = await recordingsModel.update(updates, { 
            where:{ recordID }  
        });
        console.log(data);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEMS"); 
    }
};

/**
 * Eliminar un registro de grabacion
 * @param {*} req 
 * @param {*} res  
 */
const deleteItem = async (req, res) => {
    try{
      const {recordID} = matchedData(req);
      const deleteResponse = await recordingsModel.destroy({ 
        where: {recordID},
        cascade: true
      });
      const data = {
        deleted: deleteResponse, 
      }
      res.send({data});
    }catch(e){
      console.log(e)
      handleHttpError(res,"ERROR_DELETE_ITEM")
    }
};


module.exports = {getItem, getItems, createItem, updateItem, deleteItem};