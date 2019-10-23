import Sequelize from "sequelize";

import Users from "../app/models/Users";
import Students from "../app/models/Student";

import databaseConfig from "../config/database";

// array de models
const models = [Users, Students];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    //chama o metodo init de cada model
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
