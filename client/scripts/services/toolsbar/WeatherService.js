/**
 * Created by Stephen on 2016/3/22.
 */

servicesModule.service('WeatherService', function ($q, $http) {
    this.headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
    this.defaultConfig = {headers: this.headers};

    // 天气预报访问接口：
    // GET /WeatherService.asmx/GetWeather?district=string&authkey=string HTTP/1.1
    // Host: web.36wu.com
    // 参数	    数据类型	是否必须	默认值	  格式举例	                                 含义
    // district	string	是	     无	     区域:北京、海淀、上海（必须编码） 或区域Id	  检索地区气象
    // format	string	否	     html	 json或xml	                  根据format参数返回相应xml对象或json对象
    // authkey	string	否	    无		商用或试用的authkey，无authkey参数情况下每小时访问仅限20次，点击申请authkey
    //

    this.getTodayWeather = function (district, format, authkey, callback) {
        var deferred = $q.defer();
        var path = 'http://api.36wu.com/Weather/GetWeather?district=' + district + '&authkey=' + authkey + '&format=' + format + '&callback=' + callback;
        $http({
            method: 'JSONP',
            cache: false,
            url: path
        }).success(function (data, status, headers, defaultConfig) {
            deferred.resolve(data);
        }).error(function (data, status, headers, defaultConfig) {
            deferred.reject(data);
        });
        return deferred.promise;
    };
});
