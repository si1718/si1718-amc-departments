angular.module("DepartmentManagerApp")
    .controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {
        
    $scope.mes = "December";
    $scope.value = "12";
    $scope.day = null;    
        
    $scope.change = function (item){
        $scope.mes = item.label;
        $scope.value = item.id;
        refresh();
    };
    
    $scope.change_day = function (item){
        $scope.day = item;
        refresh();
    };

    function refresh() {
        $scope.meses = [{"label":"January","id":"01"},{"label":"February","id":"02"},{"label":"March","id":"03"},{"label":"April","id":"04"},{"label":"May","id":"05"},{"label":"June","id":"06"},
        {"label":"July","id":"07"},{"label":"August","id":"08"},{"label":"September","id":"09"},{"label":"October","id":"10"},{"label":"November","id":"11"},{"label":"December","id":"12"}];
        $scope.days=[];
        for(var i=1; i<=31;i++){
            if(i<10){
                $scope.days.push("0"+i);
            }else{
                $scope.days.push(""+i);
            }
        }
        
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
                    var count = 0;
                    for(var elem in $scope.data[x][tagsArray[x]]){
                        if($scope.day != null){
                            alert($scope.day+"/"+$scope.value+"/");
                            if($scope.data[x][tagsArray[x]][elem].indexOf($scope.day+"/"+$scope.value+"/") != -1){
                                count++;
                            }
                        }else{
                            if($scope.data[x][tagsArray[x]][elem].indexOf("/"+$scope.value+"/") != -1){
                                count++;
                            } 
                        }
                    }
                        
                
                    //ocurrencesArray.push($scope.data[x][tagsArray[x]].length);
                    ocurrencesArray.push(count);

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
                    name: $scope.mes,
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
