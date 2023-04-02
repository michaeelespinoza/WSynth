const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize");
// const Recordings = require('./recordings');

const User = sequelize.define(
    "users",
    {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING, 
            // allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        edad: {
            type: DataTypes.INTEGER,
        },
        correo: {
            type: DataTypes.STRING,
        },
        passwd: {
            type: DataTypes.STRING,
        },
        rol: {
            type: DataTypes.ENUM(["user", "admin"]),
        }
    },
    {
        timestamps: true,
    }
);

// User.find = User.findAll;
// User.findById = User.findByPk;

// User.hasMany(Recordings, {onDelete: 'cascade'});
// Recordings.belongsTo(User);

module.exports = User;