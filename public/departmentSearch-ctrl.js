var app = angular.module("DepartmentManagerApp");

app.controller("SearchCtrl",["$scope","$http","$window","$location",function ($scope, $http,$window,$location){
    
        function refresh(request){
            //$location.url(request);
            $http
            .get("/api/v1/departments"+request)
            .then(function(response){
                if(response.data.length == 0){
                    swal("No matches found!", "","info");
                }
                $scope.departments = response.data;
            });
              
        }
            
        
    $scope.deleteDepartment = function (idDepartment){
        $http
            .delete("/api/v1/departments/"+idDepartment)
            .then(function(response){
                $scope.searchDepartments();
            });
        }
        
    $scope.updateDepartment = function (idDepartment){
        $window.location.href = "#!/department/" +idDepartment;
    }
 
    $scope.searchDepartments = function (){
        
        let request ="?";

        if($scope.search.department){
            request += "department=" + ($scope.search.department);
        }
        if($scope.search.school){
            request += "&school=" + $scope.search.school;
        }
        if($scope.search.tlf){
            request += "&tlf=" + $scope.search.tlf;
        }
        if($scope.search.fax){
            request += "&fax=" + $scope.search.fax;
        }
        if($scope.search.web){
            request += "&web=" + $scope.search.web;
        }
        if($scope.search.researcher){
            request += "&researcher=" + $scope.search.researcher;
        }
        if($scope.search.category){
            request += "&category=" + $scope.search.category;
        }
        
      /*        $http
            .get("/api/v1/departments/search"+request)
            .then(function(response){
                $scope.departments = response.data;
            });*/
            
         refresh(request);
    }
        

}]);