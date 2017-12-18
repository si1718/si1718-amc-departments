angular.module("DepartmentManagerApp")
    .controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {


        function refresh() {
            $http
                .get("/api/v1/departments")
                .then(function(response) {
                    $scope.data = response.data;

                    var departmentsArray = [];
                    var membersArray = [];
                    
                    for(var i = 0; i<=5; i++){
                        var members = $scope.data[i].researchers.length;
                        var department = $scope.data[i].department;
                        
                        
                        
                        departmentsArray.push(department);
                        membersArray.push(members);
                    }
                    
                    $scope.departmentsArray = departmentsArray;
                    $scope.membersArray = membersArray;


                    
            // Build the chart
           Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Researchers by department'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            },
                            connectorColor: 'silver'
                        }
                    }
                },
                series: [{
                    name: 'Members',
                    data: [
                        { name: departmentsArray[0], y: membersArray[0]},
                        {
                            name: departmentsArray[1],
                            y: membersArray[1],
                            sliced: true,
                            selected: true
                        },
                        { name: departmentsArray[2], y: membersArray[2] },
                        { name: departmentsArray[3], y: membersArray[3] },
                        { name: departmentsArray[4], y: membersArray[4] }
                    ]
                }]
            });
            
        });
            
    }
            
    refresh();
}]);
