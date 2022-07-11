import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.js";

class Label extends Model {
  static routeName = "labels";
  static orderDefault = [];
  static requiredFields = ["title"];
}

Label.init(
  {
    title: DataTypes.TEXT,
    color: DataTypes.TEXT,
  },
  {
    sequelize,
    tableName: "label",
  }
);

export default Label;
