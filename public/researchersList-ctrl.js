
var app = angular.module("DepartmentManagerApp");

app.controller("researchersListCtrl",["$scope","$http","$window","$routeParams",function ($scope, $http,$window,$routeParams){
    $scope.idDepartment = $routeParams.idDepartment;
    
    $http
        .get("/api/v1/departments/"+$scope.idDepartment)
        .then(function(response) {
            $scope.updatedDepartment = response.data;
      });
    
        function refresh(){
            
            $http
                .get("/api/v1/departments/"+$scope.idDepartment)
                .then(function(response){
                    $scope.researchers = response.data.researchers;

                });
        }
        
    $scope.edit = function (researcher){
        $window.localStorage.setItem("researcher", researcher.name);
        $window.localStorage.setItem("category", researcher.category);
        $window.location.href = "#!/editResearcher";
    }
    
     $scope.remove = function (researcher){
        var tempArray = [];
        var researchersArray = $scope.updatedDepartment.researchers;
        for(var i=0; i<researchersArray.length;i++){
              if(researchersArray[i].name != researcher.name){
                  tempArray.push(researchersArray[i]);
              }
            }
        $scope.updatedDepartment.researchers = tempArray;
        $http
              .put("/api/v1/departments/"+$scope.idDepartment,$scope.updatedDepartment)
              .then(function(response) {
            });
        refresh();
    }
    refresh();
}]);