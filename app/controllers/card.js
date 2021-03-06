const { Card, Label } = require('../models');

const cardController = {
    updateCardTags: async (req, res) => {
        try {
            const oneCard = await Card.findByPk(req.params.id, {
                include: 'labels'
            });
            await oneCard.addLabel(req.body.tag_id);
            await oneCard.reload();
            res.json(oneCard);
        } catch(error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    addCardTagsAssociation: async (req, res) => {
        try {
            const cardId = req.params.card_id;
            const labelId = req.params.label_id;
            const card = await Card.findByPk(cardId, {
                include: 'labels'
            });
            if (!card) {
                return res.status(404).json('Carte non trouvée');
            }
            const label = await Label.findByPk(labelId);
            if (!label) {
                return res.status(404).json('Label non trouvé');
            }
            await card.addLabel(label);
            await card.reload();
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    deleteCardTagsAssociation: async (req, res) => {
        try {
            const oneCard = await Card.findByPk(req.params.card_id, {
                include: 'labels'
            });
            if (!oneCard) {
                return res.status(404).json('Carte non trouvée');
            }
            const oneTag = await Label.findByPk(req.params.label_id);
            if (!oneTag) {
                return res.status(404).json('Label non trouvé');
            }
            await oneCard.removeLabel(oneTag);
            await oneCard.reload();
            res.json(oneCard);
        } catch(error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
};

module.exports = cardController;