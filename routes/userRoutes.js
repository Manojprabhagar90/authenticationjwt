const express = require('express');
const multer = require('multer')
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

const userRoute = express.Router();

userRoute.post('/register',upload.single('file'),userController.userRegister);
userRoute.post('/login',upload.single('file'),userController.login);
userRoute.post('/logout',upload.single('file'),userController.logout);
userRoute.post('/my_profile',upload.single('file'),auth.isAuthenticated,userController.my_profile);

module.exports = userRoute;