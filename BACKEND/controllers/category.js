const { matchedData } = require("express-validator");
const { categoryModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener lista de Categorias de la BBDD
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await categoryModel.findAll({}); 
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
        const {categoryID} = req;
        const data = await categoryModel.findOne({ where: {categoryID} });
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
        const data = await categoryModel.create(body);
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
        //const {categoryID, recName} = matchedData(req);
        const categoryID = req.params.categoryID;
        const updates = req.body;
        const data = await categoryModel.update(updates, { 
            where:{ categoryID }  
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
      const {categoryID} = matchedData(req);
      const deleteResponse = await categoryModel.destroy({ 
        where: {categoryID},
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