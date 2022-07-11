// on récupère les models utiles
import models from "../models/index.js";

console.log("Card", Card, Card.Card);

export const listController = {
  getListCards: async (req, res) => {
    try {
      const cards = await models.Card.findAll({
        where: {
          list_code: req.params.id,
        },
        include: "labels",
      });
      res.json(cards);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Impossible d'obtenir la liste demandee",
      });
    }
  },
};

export const { getListCards } = listController;
