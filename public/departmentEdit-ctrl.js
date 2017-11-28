var app = angular.module("DepartmentManagerApp");

app.controller("EditCtrl",["$scope","$http","$routeParams", "$location",function ($scope, $http, $routeParams, $location){
    $scope.idDepartment = $routeParams.idDepartment;
    $http
        .get("/api/v1/departments/"+$scope.idDepartment)
        .then(function(response) {
            $scope.updatedDepartment = response.data;
        });
    
    $scope.saveDepartment = function (){
      
      delete $scope.updatedDepartment._id;
    
      $http
        .put("/api/v1/departments/"+$scope.idDepartment,$scope.updatedDepartment)
        .then(function(response) {
            $location.path("/");
        });
    
    }
    
    $scope.cancel = function (){
      
      $location.path("/");
      
    }

}]);