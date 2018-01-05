var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');

//Connect to my database
mongoose.connect('mongodb://admin:' + process.env.MONGO_ATLAS_PW + '@delfinen-shard-00-00-kxjsd.mongodb.net:27017,delfinen-shard-00-01-kxjsd.mongodb.net:27017,delfinen-shard-00-02-kxjsd.mongodb.net:27017/test?ssl=true&replicaSet=Delfinen-shard-0&authSource=admin', {
    useMongoClient: true
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json());

//Hvad gør denne her?
var port = process.env.PORT || 3000;

//Cross Origin Resource Sharing
//Access-Control-Allow-Origin
var cors = require('cors');
app.use(cors())

//Middleware der bruges til at logge informationer med 
app.use(morgan('dev'));

app.use(session({secret: 'ssshhhhh'}))


//Test Middleware
var testMiddleware = require('./api/functions/check_something');
app.use(testMiddleware.testData);

//routes
var apiRoute = require('./api/routes/index');

app.use('/api',apiRoute);


//If I try to access a route that is not avaliable in the api
//It next (forwards) the error to the next error handler 
app.use(function(req,res,next) {
     var error = new Error('Route not found');
     error.status = 404;
     next(error);
})

//This error handler will handle errors forwarded from the middleware above 
//or errors thrown any were else in the application
//Errors handled else were in the application will automatic throw and error 
//and will therefor not use the above middleware. Instead it will use this middleware
//because of the error parameter.    
app.use(function(error,req,res,next) {
    console.log(error.message);
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    })
})

app.listen(3000);