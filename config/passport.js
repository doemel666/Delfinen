LocalStrategy = require('passport-local').Strategy;

var Coach = require('../api/models/coach');
var Chairman = require('../api/models/chairman');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    Coach.getCoachById(id, function(err, coach) {
      if(!coach) {
        Chairman.getChairManById(id,function(err,chairman) {
          done(err,chairman)
        })
        
      }
      else {
        done(err, coach);
      }
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    typeField: 'type',
    passReqToCallback: true
  },function(req,email, password, done) {
    if(req.body.type=='Formand') {
       Chairman.getChairManByEmail(email,function(err,chairman){
        if(err) {
          return done(err)
        } 
        if(!chairman) {
          return done(null,false, {message:'Incorrect email.'})
        }
        if(!Chairman.comparePasswords(password,chairman.password)) {
          return done(null,false, { message: 'Incorrect password.' })
        } 
        console.log("Formand");
        return done(null, chairman)
       }) 
    } else {
        
        Coach.getCoachByEmail(email,function(err,coach) {
          if(err) {
            return done(err)
          } 
          if(!coach) {
            return done(null,false, {message:'Incorrect email.'})
          }
          if(!Coach.comparePasswords(password,coach.password)) {
            return done(null,false, { message: 'Incorrect password.' })
          }
          console.log("Træner");
          return done(null, coach)
          
        })
    }
    }
  ));
}

