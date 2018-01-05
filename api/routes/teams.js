var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
    res.status(200).json({
        message: 'It works'
    })
})

router.delete('/',function(req,res) {
    res.status(200).json({
        message: 'It works'
    })  
})

router.post('/',function(req,res) {
    res.status(200).json({
        message: 'It works'
    })
})

router.put('/',function(req,res) {
    res.status(200).json({
        message: 'It works'
    })
})

router.get('/:teamId',function(req,res) {
    res.status(200).json({
        message: req.params.teamId
    })
})


module.exports = router;