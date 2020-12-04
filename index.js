require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,
    { useUnifiedTopology: true, 
     useNewUrlParser: true });

const signupRoutes = require('./routes/signup.route');
const loginRoutes = require('./routes/login.route');
const usersRoutes = require('./routes/users.route');

const app = express();
const port = process.env.PORT || 5000;


app.set('view engine', 'pug');
app.set('views', './views');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) =>{
    res.render('index');
});

app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/users', usersRoutes);


app.listen(port, () => {
    console.log('App on port' + port);
});