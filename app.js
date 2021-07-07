const express = require('express');
const app = express();
const route=require('./controller/router')
app.use(express.json())
require('./model/dbconfig')

app.use('/api/user',route);
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server Up in Port ${port}`);
})