/**
 * Created by Stephen on 2016/3/22.
 */

controllersModule.controller('HeaderBarCtrl', function ($scope, $timeout,$http, WeatherService) {
    $scope.currTime = new Date();
    $scope.name = 'World';
    setInterval();
    getWeather();

    function setInterval() {
        return $timeout(function () {
            clock();
            return setInterval();
        }, 1000);
    };

    function clock() {
        return $scope.currTime = new Date();
    };

    function getWeather() {
        var district = '101020100';
        var format = 'xml';
        var authkey = 'c2336ed98ccb414fa438f29ce2ac61ef';
        WeatherService.getTodayWeather(district, format, authkey)
            .then(function (data) {
                console.log(data);
            });
    }
    // function getWeather() {
    //     var district = '101020100';
    //     var format = 'json';
    //     var authkey = 'c2336ed98ccb414fa438f29ce2ac61ef';
    //     var path = 'http://web.36wu.com/WeatherService.asmx/GetWeather?district=' + district + '&format=' + format + '&authkey=' + authkey;
    //     $http.jsonp(path).success(function(data){
    //         console.log(data);
    //     });
    // }
});
