var mongoose = require('mongoose');
var User = mongoose.model('User');
var Bucket = mongoose.model('Bucket')

module.exports = (function(){
    return{
        add: function(req, res){
            var bucket = new Bucket(req.body)
            bucket.save(function(err, data){
                User.findOne({_id: req.body._user}, function(err, user){
                    user._buckets.push(data._id);
                    user.save(function(err, userData){
                        res.json(data);
                    })
                })
                User.findOne({_id: req.body._creator}, function(err, creator){
                    creator._buckets.push(data._id);
                    creator.save(function(err, creatorData){
                        console.log('saved')
                    })
                })
            })
        },
        getall: function(req, res){
            Bucket.find({})
            .populate('_user')
            .populate('_creator')
            .exec(function(err, buckets){
                console.log(buckets)
                res.json(buckets);
            })
        }
    }
})()
