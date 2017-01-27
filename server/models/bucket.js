var mongoose = require('mongoose');
var Schema = mongoose.Schema

var BucketSchema = new Schema({
    title: {type: String, required: true, minlength: 5},
    description: {type: String, required: true, minlength: 10},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    _creator: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

mongoose.model('Bucket', BucketSchema)
