var express = require('express');
var router = express.Router();
var passport = require('passport');

var isAuth = require('../api/functions/IsAuth');

router.get('/', function(req,res) {
    res.render('login_page')
})
/*
router.post('/', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}))
*/
router.post('/',passport.authenticate('local-login', {failureRedirect: '/'}), (req, res) => {
    
    if(req.body.type==='Træner') 
    {
      res.redirect('/coach/dashboard')
    }
    else if(req.body.type==='Formand')
    {
      console.log("Er jeg her");
      res.redirect('/chairman/dashboard')
    }
  });

var coachView = require('./coaches');
var chairmanView = require('./chairmans')

//router.use(isAuth.isUserAuth);

router.use('/chairman',chairmanView)
router.use('/coach',coachView);

module.exports = router;