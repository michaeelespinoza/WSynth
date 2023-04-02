const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize");

const UserL = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["user", "admin"]),
    },
  },
  {
    timestamps: true,
  }
);
UserL.find = UserL.findAll;
UserL.findById = UserL.findByPk;
module.exports = UserL;
