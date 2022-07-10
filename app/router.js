const express = require('express');
const router = express.Router();

const mainController = require('./controllers/main');
const listController = require('./controllers/list');
const cardController = require('./controllers/card');
const tagController = require('./controllers/label');

router.get('/:entity', mainController.readAll);
router.post('/:entity', mainController.create);
router.get('/:entity/:id', mainController.readOne);
router.patch('/:entity/:id', mainController.update);
router.delete('/:entity/:id', mainController.delete);
router.put('/:entity/:id?', mainController.createOrUpdate);

router.post('/cards/:id/tag', cardController.updateCardTags);
router.post('/cards/:card_id/tag/:tag_id', cardController.addCardTagsAssociation);
router.delete('/cards/:card_id/tag/:tag_id', cardController.deleteCardTagsAssociation);
router.get('/lists/:id/cards', listController.getListCards);

router.use(mainController.notFound);



module.exports = router;