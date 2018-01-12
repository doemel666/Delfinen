var  request = require('request');

var express = require('express');
var router = express.Router(); 

router.get('/dashboard',function(req,res) {
    

    request({
        url: 'http://localhost:3000/api/swimmers',
        method: 'GET',
        json: true
    },function(err,data){
        console.log(data.body);
        res.render('chairman_dashboard', {swimmers: data.body, name: "Hans Andersen"});
    })
    
    
})

module.exports = router;