var app = angular.module("DepartmentManagerApp");

app.controller("NewCtrl",["$scope","$http","$window", "$location",function ($scope, $http, $window, $location){
  
    $scope.saveDepartment = function (){
        
      $http
        .post("/api/v1/departments",$scope.newDepartment)
        .then(
          function(response) {
            if(response.status == 201){
              swal("Done!", "Department created!", "success");
            }
              $location.path("/");
          },
          function(data) {
            if(data.status == 409){
              swal("Error!", "The department already exists!", "error");
            }
          });
          
          
         /* function(response) {
            $location.path("/");*/
       // });
    
    }
    
    $scope.cancel = function (){
      
      $window.location.href = "#!/";
      
    }
    
    
}]);