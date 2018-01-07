var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/', function(req,res) {
    res.render('login_page')
})

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}),function(req,res) {
    console.log(req.body);
    //res.json({message:'It worked'})
});
/*
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
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
        console.log("Træner");
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
      });
    }
  ));*/

var coachView = require('./coaches');

router.use('/coach',coachView);

module.exports = router;