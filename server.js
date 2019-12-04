require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


//initialize app with express
const app = express();

//Database connection
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',() => {
     console.log('connected to mongo database');
});
mongoose.connection.on('error',(err) => {
    console.log('unable to connect to mongo database ');
});



//Routes requires
const UserRoutes = require('./routes/users');
const TaskRoutes = require('./routes/tasks');


// middlewear --- parser
app.use(bodyParser.json());

// middlewear --- passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// ... static public folder
app.use(express.static(path.join(__dirname,'public')));



// port to use by the server
const _PORT = process.env.PORT;



//Routes
app.use('/users', UserRoutes);
app.use('/tasks', TaskRoutes);





app.get('/', (req, res, next) => {
    res.send('hiiii ');
});

//start the server
app.listen(_PORT, () => {
    console.log(`Server started on port`);
});