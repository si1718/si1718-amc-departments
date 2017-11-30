angular.module("DepartmentManagerApp")
    .controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {


        function refresh() {
            $http
                .get("/api/v1/departments")
                .then(function(response) {
                    $scope.data = response.data;


                    
           /* // Radialize the colors
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
                    text: 'Browser market shares. January, 2015 to May, 2015'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
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
                        { name: 'Department1', y: 56.33 },
                        {
                            name: 'Department2',
                            y: 24.03,
                            sliced: true,
                            selected: true
                        },
                        { name: 'Department3', y: 10.38 },
                        { name: 'Department4', y: 4.77 },
                        { name: 'Department5', y: 0.91 }
                    ]
                }]
            });*/
            
        });
            
    }
            
    refresh();
}]);
