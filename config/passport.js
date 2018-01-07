LocalStrategy = require('passport-local').Strategy;

var Coach = require('../api/models/coach');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    Coach.getCoachById(id, function(err, coach) {
      //IF !coach check for chairman
      done(err, coach);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    typeField: 'type',
    passReqToCallback: true
  },function(req,email, password, done) {
    if(req.body.Formand) {
        console.log("Formand")
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
          return done(null, coach)
          
        })
    }
    /*Coach.findOne({ email: email }, function (err, coach) {
        if (err) { return done(err); }
        if (!coach) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!coach.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, coach);
      });*/
    }
  ));
}

