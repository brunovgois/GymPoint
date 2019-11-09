 import Sequelize, { Model } from "sequelize";

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title:  Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }

  getTotalPrice() {
    return this.duration * this.price;
  }
}

export default Plan;
