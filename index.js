const mongoose = require('mongoose');
const app = require("./app");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('DB connected successfully...');
    app.listen(process.env.PORT,()=>{
        
        console.log('NodeJS server is ON...')
    })
}).catch(()=>{
    console.log('DB connection failed...');
    
});