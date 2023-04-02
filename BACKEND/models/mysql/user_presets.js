const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const User = require("./user");

const userPresets = sequelize.define(
    "user_presets",
    {
        usPresetID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usUserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userID' 
            }
        },
        presetName: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        oscillator_type: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        amplitude: {
            type: DataTypes.NUMBER,
            // allowNull: false,
        },
        decay: {
            type: DataTypes.NUMBER,
            // allowNull: false,
        },
        sustain: {
            type: DataTypes.NUMBER,
            // allowNull: false,
        },
        releasee: {
            type: DataTypes.NUMBER,
            // allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

// userPresets.find = userPresets.findAll;
// userPresets.findById = userPresets.findByPk;

module.exports = userPresets;