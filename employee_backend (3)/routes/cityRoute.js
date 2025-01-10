const express = require('express');
const router = express.Router();
const cy = require('../controllers/cityController');

router.post('/add_city', cy.add_city);
router.get('/city_list', cy.city_list);

router.post('/city_list_by_id', cy.city_list_by_id);
router.post('/city_update', cy.city_update);

router.post('/city_delete', cy.city_delete);




module.exports = router;


