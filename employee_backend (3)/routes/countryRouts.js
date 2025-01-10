const express = require('express');
const router = express.Router();
const con = require('../controllers/CountryController');

router.post('/add_country', con.add_country);
router.get('/country_list', con.con_list);
module.exports = router;


