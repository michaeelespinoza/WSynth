const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Recordings = sequelize.define(
    "recordings",
    {
        recordID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        recUserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: User,
                key: 'userID'
            }
        },
        recName: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        recDuration: {
            type: DataTypes.NUMBER, 
            // allowNull: false,
        },
        recSize: {
            type: DataTypes.NUMBER,
            // allowNull: false,
        },
        ruta: {
            type: DataTypes.STRING,
            // allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

// Recordings.find = Recordings.findAll;
// Recordings.findById = Recordings.findByPk;

/* --> Eliminar registros 
Recordings.destroy({
    where: {recordID: 1},
    
  });
*/

module.exports = Recordings;