angular.module("DepartmentManagerApp")
    .controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {

    function refresh() {
        $http
            .get("/api/v1/tagsOcurrences")
            .then(function(response) {
                $scope.data = response.data;
                
                var tagsArray = [];
                var ocurrencesArray = [];
                
                for(var i = 0; i<=$scope.data.length; i++){
                    for(var k in $scope.data[i]){
                        if(k != "_id"){
                            tagsArray.push(k);
                        }
                    }
                }
                    
                for(var x in tagsArray){
                    ocurrencesArray.push($scope.data[x][tagsArray[x]].length);
                }
                
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                title: {
                    text: 'Percentage of tweets per tag'
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    categories: tagsArray
                },
                series: [{
                    name:"December",
                    data: ocurrencesArray
                }]
            });
            
            function showValues() {
                $('#alpha-value').html(chart.options.chart.options3d.alpha);
                $('#beta-value').html(chart.options.chart.options3d.beta);
                $('#depth-value').html(chart.options.chart.options3d.depth);
            }
            
            // Activate the sliders
            $('#sliders input').on('input change', function () {
                chart.options.chart.options3d[this.id] = parseFloat(this.value);
                showValues();
                chart.redraw(false);
            });
            
            showValues();
                
            });
                
        }
            
    refresh();
}]);
