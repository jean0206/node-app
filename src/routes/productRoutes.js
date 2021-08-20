const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.post('/',productController.addProduct);
router.post('/list',productController.getAllProduct)
router.get('/:id',productController.getProducts)
router.post('/offert',productController.addOffert)
router.get('/offert/:id',productController.getOffert)
router.post('/offert/accept', productController.acceptOffert)
router.post('/offert/refuse', productController.refuseOffert)

module.exports = router;