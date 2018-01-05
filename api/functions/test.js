var ssn;

module.exports = {
    auth: function(req,res,next) {
        ssn = req.session;
        
            ssn.email = "nikolajdomel";
            console.log(ssn);
            res.cookie('username','Danse');
            next();
    }
}