const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Recordings = require("./recordings");

const Storage = sequelize.define(
  "storages",
  {
    fileID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    recordID: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references:{
          model: Recordings,
          key: 'recordID'
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING, 
    }
  },
  {
    timestamps: true, 
  }
);

// Storage.find = Storage.findAll;
// Storage.findById = Storage.findByPk;

//Storage.belongsTo(Recordings, { onDelete: 'CASCADE' });
//Storage.addHook('beforeBulkDestroy', (options) => {
//  options.individualHooks = true;
//});

module.exports = Storage;
