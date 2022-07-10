const Card = require('./card');
const List = require('./list');
const Label = require('./label');


Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_code',
});

List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'list_code',
});

Card.belongsToMany(Label, {
    as: 'labels',
    through: 'card_has_label',
    foreignKey: 'card_code',
    otherKey: 'label_code',
    updatedAt: false,
});

Label.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_label',
    foreignKey: 'label_code',
    otherKey: 'card_code',
    updatedAt: false,
});

// const sequelize = require('../database');
// const init = async() => {await sequelize.sync({ force: true })};

module.exports = { Card, List, Label };
