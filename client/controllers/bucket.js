app.controller('bucketController', function($scope, bucketFactory){
    $scope.errors = [];
    $scope.addBucket = function(){
        $scope.errors = [];
        $scope.result = false;

        if(!$scope.newBucket || !$scope.newBucket.title){
            $scope.errors.push('Please type something in title field.');
        } else if (!$scope.newBucket || !$scope.newBucket.description){
            $scope.errors.push('Please type something in description field.')
        } else if($scope.newBucket.title.length < 5){
            $scope.errors.push('Title must be at least 5 characters long.');
        } else if($scope.newBucket.description.length < 10){
            $scope.errors.push('Description must be at least 10 characters long.');
        } else {
            $scope.newBucket._creator = $scope.curUser._id;
            bucketFactory.addBucket($scope.newBucket);
            $scope.newBucket = '';
        }
    }
    bucketFactory.getBuckets(function(data){
        $scope.buckets = data;
    })
})
