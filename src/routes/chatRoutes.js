const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController')

router.post('/',chatController.createChat)
router.post('/message',chatController.addMessage)
router.get('/:id',chatController.getChat)
router.get('/message/:id',chatController.getMessages)

module.exports = router;