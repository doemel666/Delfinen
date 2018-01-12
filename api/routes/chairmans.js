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
            res.status(201).json(data)
        }
    })
}) 

router.get('/',function(req,res) {
    Chairman.getAllChairmans(function(err,chairmans){
        if(err) {
            res.json(err)
        } else {
            res.status(200).json(chairmans);
        }
    })
})

module.exports = router;