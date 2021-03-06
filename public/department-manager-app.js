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
            }).when("/stadistics",{
                templateUrl: "graph.html",
                controller: "GraphCtrl"
            }).when("/dissertations",{
                templateUrl: "dissertationsList.html",
                controller: "dissertationsListCtrl"
            }).when("/researchers/:idDepartment",{
                templateUrl: "researchersList.html",
                controller: "researchersListCtrl"
            }).when("/editResearcher",{
                templateUrl: "researcherEdit.html",
                controller: "researcherEditCtrl"
            })
        
        
    });