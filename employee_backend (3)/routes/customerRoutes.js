const express = require('express');
const router = express.Router();
const cust = require('../controllers/customerControllers');

router.post('/add_customer', cust.add_customer);
router.get('/cust_list', cust.cust_list);
router.post('/cust_list_by_id', cust.cust_list_by_id);
router.post('/cust_update', cust.cust_update);
router.post('/cust_delete', cust.cust_delete);



module.exports = router;