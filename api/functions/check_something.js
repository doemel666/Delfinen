module.exports = {
    testData: function(req,res,next) {
            req.testData = "Virker det her?";
            next();
    }
}