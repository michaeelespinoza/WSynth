const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Category = sequelize.define(
    "category",
    {
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        catName: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true, 
        tableName: 'category',
        timestamps: true,
    }
);


// Category.find = Category.findAll;
// Category.findById = Category.findByPk;

module.exports = Category;