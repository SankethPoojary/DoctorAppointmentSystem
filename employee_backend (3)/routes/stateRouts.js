const express = require('express');
const router = express.Router();
const st = require('../controllers/stateController');

router.post('/add_state', st.add_state);
router.get('/state_list', st.state_list);

router.post('/state_list_by_id', st.state_list_by_id);
router.post('/state_update', st.state_update);

router.post('/state_delete', st.state_delete);
router.post('/state_list_by_country_id', st.state_list_by_country_id);

module.exports = router;
