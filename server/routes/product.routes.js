const express = require('express');
const router = express.Router();
const productCtls = require('../controllers/product.controllers');
const upload = require('../controllers/multer.config');

router.post('/productos', upload.single('rutaImagen'), productCtls.SaveProduct);
router.get('/productos', productCtls.GetProducts);


module.exports = router;

