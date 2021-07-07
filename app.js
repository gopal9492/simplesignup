const express = require('express');
const app = express();
//const route=require('./controller/router')
app.use(express.json())
require('./model/dbconfig')
require('dotenv').config();

app.use('/api/user',require('./controller/router'));
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server Up in Port ${port}`);
})