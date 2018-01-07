var Swimmer = require('../models/Swimmer');


exports.get_all_swimmers = function(req,res) {    
    console.log("Swimmers:")
    console.log(req.testData);
Swimmer.getAllSwimmers(function(err,swimmers){
    if(err) {
        res.json(err)
    } else {
        res.status(200).json(swimmers)
    }
})
}