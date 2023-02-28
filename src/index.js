const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const app = express()

const route = require('./routes/routes.js');
const mongoose =  require('mongoose');
require('dotenv').config()


app.use(express.static(path.join(__dirname, 'public')));


app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//route
function connect(){
    try {
        mongoose.connect(process.env.CONNECT_URL)
        .then(() =>{ 
        app.listen(process.env.PORT, () => console.log(`Server running on port:  ${process.env.PORT} `))
        console.log('Connected!')});    
      
    } catch (error) {
        console.log(error.message);
    }
}
connect();

route(app);