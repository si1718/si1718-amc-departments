var app = angular.module("DepartmentManagerApp");

app.controller("researcherEditCtrl",["$scope","$http","$window", "$location",function ($scope, $http, $window, $location){
    
      $scope.editResearcher = {name:$window.localStorage.getItem("researcher"),category:$window.localStorage.getItem("category")};
      $scope.idDepartment = $window.localStorage.getItem("idDepartment");
      
      $http
        .get("/api/v1/departments/"+$scope.idDepartment)
        .then(function(response) {
            $scope.updatedDepartment = response.data;
      });

      $scope.cancel = function (){
          $location.path("/");
      }
      
                
      $scope.saveDepartment = function (editResearcher){
        var researchersArray = $scope.updatedDepartment.researchers;
        for(var i=0; i<researchersArray.length;i++){
          if(researchersArray[i].name == $scope.editResearcher.name){
                  researchersArray[i].category =  $scope.editResearcher.category;
                  $scope.updatedDepartment.researchers = researchersArray;
                  break;
              }
            }
        $http
          .put("/api/v1/departments/"+$scope.idDepartment,$scope.updatedDepartment)
          .then(function(response) {
            if(response.status == 200){
                swal("Updated!", " ", "success");
            }
          });
      }
      
      
      $scope.validate = function (editResearcher){

          var investigador = editResearcher.name.replace("Dr D ","").replace("Dra Dª ","").replace("D ","").replace("Dª ","");
          var id="";
          
        $http
          .get("https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers?search="+investigador)
          .then(function(response) {
              id = response.data[0].idResearcher;
              update(id);
          });
          
          
          function update(id){
            var researchersArray = $scope.updatedDepartment.researchers;
            for(var i=0; i<researchersArray.length;i++){
              if(researchersArray[i].name == $scope.editResearcher.name){
                  researchersArray[i].url = "https://si1718-dfr-researchers.herokuapp.com/#!/researchers/"+id+"/edit";
                  $scope.updatedDepartment.researchers = researchersArray;
                  break;
              }
            }
            $http
              .put("/api/v1/departments/"+$scope.idDepartment,$scope.updatedDepartment)
              .then(function(response) {
                if(response.status == 404){
                    swal("Researcher not found!", " ", "danger");
                }else{
                    swal("Validated!!", " ", "success");
                }
            });
          }
      }
      
}]);