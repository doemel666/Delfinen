var express = require('express');
var router = express.Router();

var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

router.get('/login', function(req, res){
    res.render('login_page');
});

router.post('/login', passport.authenticate('local'), function(req,res) {
    res.render('login_page');
});


module.exports = router;