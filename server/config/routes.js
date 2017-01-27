var user = require('./../controllers/session.js')
var bucket = require('./../controllers/bucket.js')

module.exports = function(app){
    app.post('/login', function(req, res){
        user.login(req, res);
    })
    app.get('/checkstatus', function(req, res){
        user.checkStatus(req, res)
    })
    app.get('/logout', function(req, res){
        user.logout(req, res);
    })
    app.get('/users/getUsers', function(req, res){
        user.getUsers(req, res);
    })
    //*********************************************
    app.post('/bucket/add', function(req, res){
        bucket.add(req, res);
    })
    app.get('/bucket/getall', function(req, res){
        bucket.getall(req, res);
    })
}
