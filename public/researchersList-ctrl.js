
var app = angular.module("DepartmentManagerApp");

app.controller("researchersListCtrl",["$scope","$http","$window",function ($scope, $http,$window){
    
        function refresh(){
            
            $http
                .get("https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers")
                .then(function(response){
                    $scope.researchers = response.data;
                });
        }
    refresh();
}]);