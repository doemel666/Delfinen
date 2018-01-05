var express = require('express');
var router = express.Router();
var moongose = require('mongoose');

var Chairman = require('../models/chairman');

router.post('/signup',function(req,res){
    var chairman = {
        email: req.body.email,
        password: req.body.password
    }

    Chairman.addChairman(chairman,function(err,data){
        if(err) {
            res.json(err)
        }
        else {
            res.statusCode(201).json(data)
        }
    })
}) 

module.exports = router;