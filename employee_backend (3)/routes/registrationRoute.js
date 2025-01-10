const express = require('express');
const router = express.Router();
const reg = require('../controllers/registrationController');
const img= require('../controllers/imageControler')
router.post('/add_user', reg.add_user);
router.post('/login', reg.login);
router.post('/image_add',img.single('testimage'), reg.image_add);
router.post('/update',img.single('testimage'), reg.edit_image);
router.get('/image_list',reg.image_list);
router.post('/img_list_by_id',reg.img_list_by_id);

module.exports = router;




