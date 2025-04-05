const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userController = {
    userRegister : async(request,response) =>{
       try{
        const { username , email , password } = request.body;

        const userExists = await user.findOne({ email : email});
 
        if (userExists) {
           return response.status(400).json({ message: 'User already exists' });
        }
 
        const encrypted_password = await bcrypt.hash(password,10);
        const newUser = new user({
             name:username,
             email,
             password: encrypted_password
         });
 
         await newUser.save();
 
         return response.status(201).json({ message: 'User created successfully' });
      }catch(error){
        return response.status(500).json({ message: error.message });
      }


    },
    login : async(request,response)=>{
        try{
            const {  email , password } = request.body;

            const login_user = await user.findOne({ email:email});

            if(!login_user){
                return response.status(400).json({message:"Invalid Username..."})
            }


            const check_password = await bcrypt.compare(password,login_user.password);

            if(!check_password){
                return response.status(400).json({message:"Invalid Password..."})
            }

            const token = jwt.sign({id:login_user._id},process.env.JWT_SECRET);
 
            return response.status(200).json({message:`Login successfull...`,token});
        }catch(error){
            return response.status(500).json({ message : error.message })
        }
    },
    logout : async(request,response)=>{
        try {
            response.clearCookie('token');
            return response.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    my_profile : async(request,response)=>{
        try {
            
            const userId = request.userId;


            const my_user = await user.findById(userId).select('-password -__v -createdAt -updatedAt -_id');

            return response.status(200).json(my_user);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;