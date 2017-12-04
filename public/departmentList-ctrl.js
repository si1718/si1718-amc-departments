
var app = angular.module("DepartmentManagerApp");



app.controller("ListCtrl",["$scope","$http","$window",function ($scope, $http,$window){
    
        function refresh(){
            
            $http
                .get("/api/v1/departments")
                .then(function(response){
                    $scope.departments = response.data;
                });
        }

        $scope.deleteDepartment = function (idDepartment){
            
            swal({
                    title: "Are you sure?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
            },
            function(){
                $http
                    .delete("/api/v1/departments/"+idDepartment)
                    .then(function(response){
                        refresh();
                    });
                swal("Deleted!", "Department has been deleted.", "success");
            });
       
        }
        
        $scope.newDepartment = function (idDepartment){
            $window.location.href = "#!/createDepartment";
        }
        
        $scope.updateDepartment = function (idDepartment){
            $window.location.href = "#!/department/" +idDepartment;
        }
        
        $scope.researchers = function (idDepartment){
            $window.localStorage.setItem("idDepartment", idDepartment);
            $window.location.href = "#!/researchers/" +idDepartment;
        }

        refresh();
}]);