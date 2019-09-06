const router = require('express').Router();
const controller = require('./contact.controller');

router.get('/all', controller.getAll);
router.get('/:id', controller.getById);
router.post('/create', controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;