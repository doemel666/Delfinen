 var moongose = require('mongoose');
 var ObjectId = require('mongodb').ObjectId;


 var swimmerSchema = moongose.Schema({
    _id: moongose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    dateOfBirth: Date,
    email: String,
    memberShip: String,
    swimmerType: String,
    Competing: Boolean
 });

var Swimmer = module.exports = moongose.model('Swimmer',swimmerSchema);


 module.exports = {
    addSwimmer : function(swimmer,callback) {
        
        const swimme = {
            _id : moongose.Types.ObjectId(),
            name: swimmer.name,
            //age : swimmer.age
        };
        
        Swimmer(swimme).save().then(result => {    
            callback(result)
        }).catch(err => {
            callback(err)
        })
    },

    getAllSwimmers : function(callback) {
        Swimmer.find({},callback)
    },

    getSwimmer : function(id,callback) {
        Swimmer.findOne({'_id':ObjectId(id)},callback)
    },

    deleteSwimmer : function(id,callback) {
        Swimmer.deleteOne({'_id':ObjectId(id)},callback)
    }

 };