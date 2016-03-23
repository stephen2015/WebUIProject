/**
 * Created by Stephen on 2016/3/22.
 */

controllersModule.controller('HeaderBarCtrl', function ($scope, $timeout, $http, WeatherService) {
    $scope.currTime = new Date();
    $scope.currWeather = {};
    getWeather();
    setInterval();
    setIntervalWeather();

    function setInterval() {
        return $timeout(function () {
            clock();
            return setInterval();
        }, 1000);//每秒更新一次
    };

    function setIntervalWeather() {
        return $timeout(function () {
            getWeather();
            return setIntervalWeather();
        }, 1000*60*60*2);//每2小时更新一次
    };
    function clock() {
        return $scope.currTime = new Date();
    };

    function getWeather() {
        var district = '101190401'; //城市ID(苏州)
        var format = 'json';        //返回格式
        var authkey = 'c2336ed98ccb414fa438f29ce2ac61ef';//授权码
        var callback = 'JSON_CALLBACK';//jsonp回调参数(必须的，不然解析数据报错)
        WeatherService.getTodayWeather(district, format, authkey, callback)
            .then(function (data) {
                if (data.status == 200) {
                    console.log(data.data);
                    $scope.currWeather = data.data;
                }
            });
    }
});