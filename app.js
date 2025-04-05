const express = require('express');
const userRoute = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/',userRoute);

module.exports = app;