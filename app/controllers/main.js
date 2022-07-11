import models from "../models/index.js";

export const mainController = {
  getModel: (entity) => {
    for (const model in models) {
      if (models[model].routeName === entity) {
        return models[model];
      }
    }
    return null;
  },
  readAll: async (req, res) => {
    try {
      const Model = mainController.getModel(req.params.entity);
      if (!Model) {
        res.status(404).json("Entité inexistante");
      }
      const data = await Model.findAll({
        include: {
          all: true,
          nested: true,
        },
        order: Model.orderDefault,
      });
      res.json(data);
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  create: async function (req, res) {
    try {
      const Model = mainController.getModel(req.params.entity);
      if (!Model) {
        res.status(404).json("Entité inexistante");
      }

      for (field of Model.requiredFields) {
        if (!req.body[field]) {
          throw new Error(field + " obligatoire");
        }
      }
      const newItem = await Model.create(req.body);
      res.json(newItem);
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  readOne: async function (req, res) {
    try {
      const Model = mainController.getModel(req.params.entity);
      if (!Model) {
        res.status(404).json("Entité inexistante");
      }

      const oneItem = await Model.findByPk(req.params.id);
      if (oneItem) {
        res.json(oneItem);
      } else {
        res.status(404).json({
          message: "Element non trouvé",
        });
      }
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  update: async function (req, res) {
    try {
      const Model = mainController.getModel(req.params.entity);
      if (!Model) {
        res.status(404).json("Entité inexistante");
      }

      const itemToUpdate = await Model.findByPk(req.params.id);
      if (itemToUpdate) {
        Object.assign(itemToUpdate, req.body);
        const data = await itemToUpdate.save();
        res.json(data);
      }
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  deleteOne: async function (req, res) {
    try {
      const Model = mainController.getModel(req.params.entity);
      if (!Model) {
        res.status(404).json("Entité inexistante");
      }

      const itemToDestroy = await Model.findByPk(req.params.id);
      if (itemToDestroy) {
        await itemToDestroy.destroy();
        res.json("Item supprimé");
      } else {
        res.status(404).json(`Aucun item à l'id ${req.params.id}`);
      }
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      const entity = req.params.entity;
      const Model = mainController.getModel(entity);
      if (!Model) {
        res.status(404).json("Entité inexistante");
      }
      let item;
      if (req.params.id) {
        item = await Model.findByPk(req.params.id);
      }
      if (item) {
        await mainController.update(req, res);
      } else {
        await mainController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  notFound: (req, res) => {
    res.status(404).json("Ce endpoint n'existe pas");
  },
};

export const {
  getModel,
  readAll,
  create,
  readOne,
  update,
  deleteOne,
  createOrUpdate,
  notFound,
} = mainController;
