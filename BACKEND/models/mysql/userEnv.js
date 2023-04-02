const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize");
const User = require("./user");
const Recordings = require("./recordings");
const userPresets = require("./user_presets");


const userEnv = sequelize.define(
    "userenv",
    {
        userEnvID: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: User,
                key: 'userID'
            }
        },
        username: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        recordID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recordings,
                key: 'recordID'
            }
        },
        recName: {
            type: DataTypes.STRING,
        },
        usPresetID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userPresets,
                key: 'usPresetID'
            }
        },
        presetName: {
            type: DataTypes.STRING,
        }
    }
);

//userEnv.find = userEnv.findAll;
//userEnv.findById = userEnv.findByPk;

module.exports = userEnv;