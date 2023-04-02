const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Category = require("./category");
const Presets = require("./presets");

const soundEnv = sequelize.define(
    "soundenv",
    {
        soundEnvID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Category,
                key: 'categoryID'
            }
        },
        catName: {
            type: DataTypes.STRING,
        },
        presetID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Presets,
                key: 'presetID'
            }
        },
        presetName: {
            type: DataTypes.STRING,
        }
    }
);


//soundEnv.find = soundEnv.findAll;
//soundEnv.findById = soundEnv.findByPk;

module.exports = soundEnv;