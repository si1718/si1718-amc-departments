angular.module("DepartmentManagerApp")
    .controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {


        function refresh() {
            $http
                .get("/api/v1/departments")
                .then(function(response) {
                    $scope.data = response.data;

                    var departmentsArray = [];
                    var membersArray = [];
                    
                    for(let i = 0; i<=5; i++){
                        let members = $scope.data[i].researchers.length;
                        let department = $scope.data[i].department;
                        
                        
                        
                        departmentsArray.push(department);
                        membersArray.push(members);
                    }
                    
                    $scope.departmentsArray = departmentsArray;
                    $scope.membersArray = membersArray;


                    
            // Radialize the colors
            Highcharts.setOptions({
                colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
                    return {
                        radialGradient: {
                            cx: 0.5,
                            cy: 0.3,
                            r: 0.7
                        },
                        stops: [
                            [0, color],
                            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                        ]
                    };
                })
            });

            // Build the chart
           Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Researchers in departments'
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
