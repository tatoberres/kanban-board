import Card from "./card.js";
import List from "./list.js";
import Label from "./label.js";

Card.belongsTo(List, {
  as: "list",
  foreignKey: "list_code",
});

List.hasMany(Card, {
  as: "cards",
  foreignKey: "list_code",
});

Card.belongsToMany(Label, {
  as: "labels",
  through: "card_has_label",
  foreignKey: "card_code",
  otherKey: "label_code",
  updatedAt: false,
});

Label.belongsToMany(Card, {
  as: "cards",
  through: "card_has_label",
  foreignKey: "label_code",
  otherKey: "card_code",
  updatedAt: false,
});

// const sequelize = require('../database');
// const init = async() => {await sequelize.sync({ force: true })};

export default { Card, List, Label };
