module.exports.home = function(req, res){
    return res.send(req.user);
}