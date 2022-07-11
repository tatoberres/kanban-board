import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.js";

class List extends Model {
  static routeName = "lists";
  static orderDefault = [
    ["position", "ASC"],
    ["id", "ASC"],
    ["cards", "position", "ASC"],
  ];
  static requiredFields = ["title"];
}

List.init(
  {
    title: DataTypes.TEXT,
    position: DataTypes.SMALLINT,
  },
  {
    sequelize,
    tableName: "list",
  }
);

export default List;
