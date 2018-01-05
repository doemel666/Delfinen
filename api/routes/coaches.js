var express = require('express');
var router = express.Router();
var moongose = require('mongoose');

var Coach = require('../models/coach');

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

router.post('/login',function(req,res) {
    Coach.loginCoach(req.body.email,req.body.password,function(err,result) {
        if(err) {
            res.json(err)
        } else {
            res.json(result);
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

module.exports = router;