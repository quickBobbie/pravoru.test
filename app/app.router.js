const router = require('express').Router();
const contact = require('./modules/contact/contact.router');

router.use('/contact', contact);

module.exports = router;