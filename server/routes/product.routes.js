const express = require('express');
const router = express.Router();
const productCtls = require('../controllers/product.controllers');
const upload = require('../controllers/multer.config');

router.post('/productos', upload.single('image'), productCtls.SaveProduct);


module.exports = router;

