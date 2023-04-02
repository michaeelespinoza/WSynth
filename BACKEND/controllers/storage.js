const fs = require("fs");
const { matchedData } = require("express-validator");
const { StorageModel } = require("../models");
const { recordingsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await StorageModel.findAll({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_LIST_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { fileID } = matchedData(req);
    const data = await StorageModel.findOne({ where: {fileID} });
    res.send({ data }); 
  } catch (e) { 
    console.log(e)
    handleHttpError(res, "ERROR_DETAIL_ITEMS");
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { file } = req;
    const recordID = req.body.recordID; // Se obtiene el valor de la PK de la tabla 'Recordings'
    const record = await recordingsModel.findByPk(recordID); // Se busca la instancia de la tabla 'Recordings' en la BD con el metodo findByPk
    // Si la instancia de grabacion existe, crea una nueva instancia en la tabla 'Storage' (se guarda la info del archivo de grabacion generado)
    // Si no existe, devuelve un error indicando que la FK no se puede asignar
    if(!record){
      res.status(400).json({Error: 'La grabación especificada no existe'});
    }
    else{
      const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
        recordID: record.recordID 
      };
      const data = await StorageModel.create(fileData);
      console.log(data);
      res.status(201);
      res.send({ data });
    }
  } catch (e) {
    handleHttpError(res, "ERROR_DETAIL_ITEMS");
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { fileID } = matchedData(req);
    const dataFile = await StorageModel.findOne({ where: {fileID} });
    const deleteResponse = await StorageModel.destroy({ where: {fileID} });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`; //TODO c:/miproyecto/file-1232.png

    // fs.unlinkSync(filePath);
    const data = {
      filePath, 
      deleted: deleteResponse, 
    }; 

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_ITEMS");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem }; 
