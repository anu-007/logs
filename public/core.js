var scotchTodo = angular.module('dailyLogs', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/logs')
        .success(function(data) {
            $scope.logs = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createLog = function() {
        $http.post('/api/logs', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.logs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
