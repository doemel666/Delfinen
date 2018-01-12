module.exports = {
    isUserAuth: function(req,res,next) {
        if(req.isAuthenticated())
        {
            console.log("Authorized User");
            next();
        }
        else {
            console.log("UnAuthorized User")
            res.redirect('/')
        }
    }
}