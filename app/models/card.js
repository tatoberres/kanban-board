import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.js";

class Card extends Model {
  static routeName = "cards";
  static orderDefault = [["position", "ASC"]];
  static requiredFields = ["title", "list_code"];
}

Card.init(
  {
    title: DataTypes.TEXT,
    color: DataTypes.TEXT,
    position: DataTypes.SMALLINT,
  },
  {
    sequelize,
    tableName: "card",
  }
);

export default Card;
