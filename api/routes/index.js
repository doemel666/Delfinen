var express = require('express');
var router = express.Router();

var swimmersRoute = require('./swimmers');
var teamsRoute = require('./teams');
var chairmanRoute= require('./chairmans');
var coachesRoute = require('./coaches');

router.use('/swimmers',swimmersRoute);
router.use('/teams',teamsRoute);
router.use('/chairman',chairmanRoute);
router.use('/coaches',coachesRoute);

module.exports = router;