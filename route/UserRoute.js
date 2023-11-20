const express = require('express');
const UserController = require('../controller/userController');
const SignupLoginController = require('../controller/signupLoginController')
const verifyToken = require('../middleware/AuthMiddleware')

const router = express.Router();

router.post('/save-user', verifyToken, UserController.saveUser);
router.put('/update-user', verifyToken, UserController.updateUser);
router.delete('/delete-user', verifyToken, UserController.deleteUser);
router.get('/get-user', verifyToken, UserController.findUser);
router.get('/get-all-users', verifyToken, UserController.findAllUsers);

router.post('/signup', SignupLoginController.signup);
router.post('/login', SignupLoginController.login);

module.exports=router;