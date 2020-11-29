const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const signupRoutes = require('./routes/signup.route');
const loginRoutes = require('./routes/login.route');

const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.render('index');
});

app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
    console.log('App on port' + port);
});