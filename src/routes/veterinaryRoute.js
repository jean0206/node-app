const express = require('express');
const router = express.Router();
const vetController = require('../controllers/veterinaryController')


router.get('/',vetController.getVeterinary)
router.post('/',vetController.addVeterinary)
router.put('/:huaweiId/photos',vetController.addPhotoGallery)
router.post('/:huaweiId/photos',vetController.deletePhoto)
router.put('/:huaweiId/service',vetController.addService)
router.post('/:huaweiId/service',vetController.deleteService)
router.post('/:huaweiId/hour',vetController.changeHour)
router.post('/:huaweiId/location',vetController.changeLocation)
router.get('/:huaweiId/open',vetController.changeOpen)


module.exports = router;