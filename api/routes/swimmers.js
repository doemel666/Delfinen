var express = require('express');
var router = express.Router();
var moongose = require('mongoose');
var Swimmer = require('../models/Swimmer');

var test = require('../functions/test')

//Checkauth can be added to every route I want to.
//It checks if the the request has a webtoken. (Is logged in)  
var checkAuth = require('../functions/check-auth');
//router.use(test.auth);
    

router.get('/',function(req,res) {    
        console.log("Swimmers:")
        console.log(req.testData);
    Swimmer.getAllSwimmers(function(err,swimmers){
        if(err) {
            res.json(err)
        } else {
            res.status(200).json(swimmers)
        }
    })
})

router.delete('/:id',function(req,res) {
    Swimmer.deleteSwimmer(req.params.id,function(err) {
        if(err) {
            res.json(err);
        } else {
            res.json({message:'User Deleted'});
        }
    })  
})

router.post('/',function(req,res, next) {
   
var swimmer = {
    name: req.body.name,
    age : req.body.age
}

Swimmer.addSwimmer(swimmer,function(err,data){
    if(err) {
        res.json(err)
    }
    else {
        res.json(data)
    }
})

})

router.put('/',function(req,res) {
        
})

router.get('/:swimmerId',function(req,res) {
    Swimmer.getSwimmer(req.params.swimmerId,function(swimmer,err){
        if(err) {
            res.json(err);
        } else {
            res.json(swimmer);
        }
    })
})


module.exports = router;