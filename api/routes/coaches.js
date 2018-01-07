var express = require('express');
var router = express.Router();
var moongose = require('mongoose');

var Coach = require('../models/coach');

var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;


router.post('/signup',function(req,res){
    
    var coach = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    Coach.addCoach(coach,function(data,err){
        if(err) {
            res.json(err)
        }
        else {
            res.status(201).json(data)
        }
    })
}) 



router.get('/',function(req,res) {
    
    Coach.getAllCoaches(function(err,coaches) {
        if(err) {
            res.json(err);
        } else {
            res.json(coaches);
        }
    })
})
/*
passport.use(new LocalStrategy(
    function(email, password, done) {
      console.log("Er jeg he???");
    }));

passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
       
passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

router.post('/login', passport.authenticate('local'),function(req,res) {
    Coach.loginCoach(req.body.email,req.body.password,function(err,result) {
        if(err) {
            res.json(err)
        } else {
            res.json(result);
        }
    })
})*/

router.post('/login',function(req,res) {
    Coach.loginCoach(req.body.email,req.body.password,function(err,result) {
        if(err) {
            res.json(err)
        } else {
            res.json(result);
        }
    })
})

module.exports = router;