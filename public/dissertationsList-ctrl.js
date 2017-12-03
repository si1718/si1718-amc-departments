
var app = angular.module("DepartmentManagerApp");



app.controller("dissertationsListCtrl",["$scope","$http","$window",function ($scope, $http,$window){
    
        function refresh(){
            
            $http
                .get("https://si1718-avp-dissertations.herokuapp.com/api/v1/dissertations")
                .then(function(response){
                    $scope.dissertations = response.data;
                });
        }

        refresh();
}]);