const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.post('/',userController.addUser);
router.get('/:huaweiId/verify',userController.verifyId);
router.post('/product',userController.addProduct);
router.post("/products/",userController.getAllProducts)
router.post("/edit",userController.editUser)
router.get('/',(req, res) => {
    res.send('Hola')
})
/*
router.get('/:huaweiId/type',userController.verifyType);
router.get('/:huaweiId',userController.getBasicInfo);
router.put('/:huaweiId',userController.editPhoto);
router.get('/:huaweiId/veterinary',userController.getVeternaries);*/

module.exports = router;