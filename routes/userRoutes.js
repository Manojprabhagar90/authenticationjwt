const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const userRoute = express.Router();

userRoute.post('/register',userController.userRegister);
userRoute.post('/login',userController.login);
userRoute.post('/logout',userController.logout);
userRoute.post('/my_profile',auth.isAuthenticated,userController.my_profile);

module.exports = userRoute;