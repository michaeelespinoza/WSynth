const { matchedData } = require("express-validator");
const { presetsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener lista de Categorias de la BBDD
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await presetsModel.findAll({}); 
        res.send({ data,  user });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * Obtener una Cateogoria concreta de la BDD
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {PresetID} = req;
        const data = await presetsModel.findOne({ where: {PresetID} });
        res.send({ data });
    } catch(e) {
        handleHttpError(res,"ERROR_GET_ITEM") 
    }
};

/**
 * Insertar una nueva Categoria de grabacion
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await presetsModel.create(body);
        console.log(data)
        res.status(201);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};

/**
 * Actualizar una Categoria
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        //const {PresetID, recName} = matchedData(req);
        const PresetID = req.params.PresetID;
        const updates = req.body;
        const data = await presetsModel.update(updates, { 
            where:{ PresetID }  
        });
        console.log(data);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEMS"); 
    }
};

/**
 * Eliminar una Categoria
 * @param {*} req 
 * @param {*} res  
 */
const deleteItem = async (req, res) => {
    try{
      const {PresetID} = matchedData(req);
      const deleteResponse = await presetsModel.destroy({ 
        where: {PresetID},
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