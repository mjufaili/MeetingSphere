var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const PORT = process.env.PORT;
const session = require('express-session');

// add function path
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Profile');
var testAPIRouter = require("./routes/testApi");
var userSignup = require('./routes/userSignup');
var profileRouter = require('./routes/Profile');
var activitiesRouter = require('./routes/activities');
var userSearchRouter = require('./routes/userSearch')
var groupsRouter = require('./routes/groups');
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("trust proxy", 1);

const corsOptions ={
    origin:['http://localhost:3000', 'https://kaiyang-hu--4177-group-project.netlify.app'],
    credentials:true,
    optionSuccessStatus:200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    alloweHeaders: ['Conten-Type', 'Authorization'],
}

const sess = {
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
};


app.use(cors(corsOptions));
app.use(session(sess));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//add path to the API
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userSignup', userSignup)
app.use('/testApi', testAPIRouter);
app.use('/profile', profileRouter);
app.use('/activities',activitiesRouter)
app.use('/userSearch', userSearchRouter);
app.use('/groups', groupsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(9000, () => {
    console.log("Server is running on port " + 9000);
});


module.exports = app;
