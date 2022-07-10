// on récupère les models utiles
const { List, Card } = require('../models');

const listController = {
    getListCards: async (req, res) => {
        try {
            const cards = await Card.findAll({
                where: {
                    list_code: req.params.id,
                },
                include: 'labels'
            });
            res.json(cards);
        }  catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Impossible d\'obtenir la liste demandee',
            });
        }
    }
};

module.exports = listController;