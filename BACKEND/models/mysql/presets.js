const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Category = require("./category");

const Presets = sequelize.define(
    "presets",
    {
        PresetID: {
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
        presetName: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,  
    }
);


//Presets.find = Presets.findAll;
//Presets.findById = Presets.findByPk;

module.exports = Presets;