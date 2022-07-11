import { Router } from "express";
const router = Router();

import {
  readAll,
  create,
  readOne,
  update,
  deleteOne,
  createOrUpdate,
  notFound,
} from "./controllers/main.js";
import { getListCards } from "./controllers/list.js";
import {
  updateCardTags,
  addCardTagsAssociation,
  deleteCardTagsAssociation,
} from "./controllers/card.js";

router.get("/:entity", readAll);
router.post("/:entity", create);
router.get("/:entity/:id", readOne);
router.patch("/:entity/:id", update);
router.delete("/:entity/:id", deleteOne);
router.put("/:entity/:id?", createOrUpdate);

router.post("/cards/:id/tag", updateCardTags);
router.post("/cards/:card_id/tag/:tag_id", addCardTagsAssociation);
router.delete("/cards/:card_id/tag/:tag_id", deleteCardTagsAssociation);
router.get("/lists/:id/cards", getListCards);

router.use(notFound);

export default router;
