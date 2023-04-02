const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./mysql";

const models = {
  usersModel: require(`${pathModels}/user`),
  recordingsModel: require(`${pathModels}/recordings`),
  StorageModel: require(`${pathModels}/storage`),
  userPresetsModel: require(`${pathModels}/user_presets`),
  categoryModel: require(`${pathModels}/category`),
  presetsModel: require(`${pathModels}/presets`),
};

module.exports = models;
