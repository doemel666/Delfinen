var moongose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcrypt');


var chairmanSchema = moongose.Schema({
    _id : moongose.Schema.Types.ObjectId,
    name: String,
    email : {type: String, 
            required: true, 
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: String, required: true}
});


var Chairman = module.exports = moongose.model('Chairman',chairmanSchema);

module.exports = {
    addChairman : function(chairman,callback) {
        Chairman.find({email: chairman.email}).then(user => {
            if(user.length>0) {
                callback({message:'User already exist'}) 
            } else {
                bcrypt.hash(chairman.password, 10, function(err,hash) {
                    if(err) {
                        callback(err);
                    } else {
                        
                    const chairMan = {
                        _id : moongose.Types.ObjectId(),
                        email: chairman.email,
                        password : hash
                    };
                    
                    Chairman(chairMan).save().then(result => {    
                        callback(result)
                    }).catch(err => {
                        callback(err)
                    })            
                    }
                })
            }
        })
        
    },

    getAllChairmans: function(callback) {
        Chairman.find({},callback);
    },

    getChairManByEmail: function(email,callback) {
        Chairman.findOne({email:email},callback)
    },

    comparePasswords: function(password,chairManPassword) {
        return bcrypt.compareSync(password,chairManPassword);
   },

   getChairManById: function(id,callback) {
    Chairman.findOne({_id:id},callback)
},
}