var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
    return{
        login: function(req, res){
            User.findOne({name: req.body.name}, function(err, data){
                if(!data){
                    var user = new User(req.body);
                    user.save(function(err, data){
                        req.session.user = data;
                        req.session.save()
                        res.json(data);
                    })
                } else {
                    req.session.user = data;
                    req.session.save();
                    res.json(data);
                }
            })
        },
        checkStatus: function(req, res){
            if(req.session.user){
                User.findOne({_id: req.session.user._id})
                .populate('_buckets')
                .populate({
                    path: '_buckets',
                    model: 'Bucket',
                    populate: {
                        path: '_creator',
                        model: 'User'
                    }
                })
                .exec(function(err, user){
                    res.json(user)
                })

            } else {
                res.json(null);
            }
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/')
        },
        getUsers: function(req, res){
            User.find({})
            .populate('_buckets')
            .populate({
                path: '_buckets',
                model: 'Bucket',
                populate: {
                    path: '_creator',
                    model: 'User'
                }
            })
            .exec(function(err, users){
                res.json(users)
            })
        }
    }
})()
