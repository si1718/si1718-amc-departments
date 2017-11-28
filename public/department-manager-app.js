/*global angular*/
    var app = angular.module("DepartmentManagerApp",["ngRoute"]);
    
    app.config(function($routeProvider){
        
        $routeProvider
            .when("/",{
                templateUrl: "departmentList.html",
                controller: "ListCtrl"
            }).when("/search?:params",{
                templateUrl: "departmentSearch.html",
                controller: "SearchCtrl"
            }).when("/department/:idDepartment",{
                templateUrl: "departmentEdit.html",
                controller: "EditCtrl"
            }).when("/createDepartment",{
                templateUrl: "departmentNew.html",
                controller: "NewCtrl"
            })
        
        
    });
    console.log("App Initialized");