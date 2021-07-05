var express = require('express');
var router = express.Router();
const countryController = require('./../controllers/countryController');

router.get('/', countryController.getCountryList);
router.get('/:id', countryController.getCountryById);
router.post('/', countryController.addCountry)
module.exports = router;
