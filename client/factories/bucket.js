app.factory('bucketFactory', function($http, $location, $route){
    var factory = {};
    factory.addBucket = function(bucket){
        $http.post('/bucket/add', bucket).then(function(output){
            $route.reload();
        })
    }
    factory.getBuckets = function(cb){
        $http.get('/bucket/getall').then(function(output){
            cb(output.data);
        })
    }
    return factory;
})
