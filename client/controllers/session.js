app.controller('sessionController', function($scope, sessionFactory, $routeParams){
    $scope.errors = [];
    $scope.doneBuckets = [];
    sessionFactory.checkStatus(function(data){
        $scope.curUser = data
    })
    $scope.login = function(){
        $scope.errors = [];
        $scope.result = false;

        if(!$scope.logReg || !$scope.logReg.name){
            $scope.errors.push('Please type something in login field.');
        } else if($scope.logReg.name.length < 3){
            $scope.errors.push('Name must be 3 characters long.');
        } else if($scope.logReg.name.length > 10){
            $scope.errors.push('Your name must be shorter than 10 characters.');
        } else {
            sessionFactory.login($scope.logReg);
            $scope.logReg = '';
        }
    }
    if($routeParams.id){
        sessionFactory.getUsers(function(data){
            $scope.users = data;
            for(user in $scope.users){
                if($scope.users[user]['_id'] == $routeParams.id){
                    $scope.cur_user = $scope.users[user];
                }
            }
        })
    } else {
        sessionFactory.getUsers(function(data){
            $scope.users = data;
        })
    }
    $scope.update = function(){
        $scope.pending = true;
        $scope.done = true;
    }
    $scope.show = function(id){
        sessionFactory.show(id)
    }

})
