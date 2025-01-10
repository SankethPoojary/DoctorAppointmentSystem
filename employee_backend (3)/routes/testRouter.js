const express = require('express');
const router = express.Router();
const test = require('../controllers/testController');

router.post('/add_data', test.add_data);
router.post('/add_employee', test.add_employee);
router.get('/employee_list', test.employee_list);

module.exports = router;