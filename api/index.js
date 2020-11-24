const { request, response } = require('express')
require('./config');
const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express(); 
app.use(express.json());

app.use(cors());

app.use(routes);

const PORT = 3001;
app.listen(PORT, () =>{
    console.log('API running http://localhost:' + PORT);
});
