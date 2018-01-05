var moongose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var coachSchema = moongose.Schema({
    _id : moongose.Schema.Types.ObjectId,
    name : String,
    password : String,
    email: {type: String, 
            required: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    teamIds : [moongose.Schema.Types.ObjectId]
})

var Coach = module.exports = moongose.model('Coach',coachSchema);

module.exports = {
    addCoach : function(coach,callback) {
        console.log("Add Coach Function");
        Coach.find({email: coach.email}).then(user => {
            if(user.length>0) {
                callback({message:'User already exist'}) 
            } else {
                
                bcrypt.hash(coach.password, 10, function(err,hash) {
                    if(err) {
                        callback(err);
                    } else {
                    const c = {
                        _id : moongose.Types.ObjectId(),
                        name: coach.name,
                        email: coach.email,
                        password : hash
                    };
                    Coach(c).save().then(result => {    
                        callback(result)
                    }).catch(err => {
                        callback(err)
                    })            
                    }
                })
            }
        })
    },

    getAllCoaches : function(callback) {
        Coach.find({},callback);
    },

    loginCoach : function(email,password,callback) {
        Coach.findOne({email:email}).then(coach => 
        {
            if(!coach) {
                callback({message: "Auth Failed"})
            } 
            else {
                bcrypt.compare(password,coach.password, (err, result) => {
                    if(err) {
                        callback({message: "Auth Failed"})
                    }
                    if(result) {
                        const token = jwt.sign({email: coach.email,userId: coach._id}, 'some_secret', {expiresIn: "1h"}); 
                            
                        callback({message: "Auth Succesfull", token: token});
                    }
                    else {
                        callback({message: "Auth Failed"})
                    }
                })
            }
        })
    }
}