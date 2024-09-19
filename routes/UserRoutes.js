const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authenticateJWT } = require('../middlewares/AuthMiddleware');

router.post('/', authenticateJWT, userController.createUser);
router.get('/', authenticateJWT, userController.getUsers);
router.get('/:id', authenticateJWT, userController.getUserById);
router.put('/:id', authenticateJWT, userController.updateUser);
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;
