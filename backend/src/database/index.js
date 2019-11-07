import Sequelize from "sequelize";

import User from "../app/models/User";
import Students from "../app/models/Student";
import Plan from "../app/models/Plan";

import databaseConfig from "../config/database";

// array de models
const models = [User, Students, Plan];

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
