/**
 * Created by Stephen on 2016/3/20.
 */
var dependencies = ['ui.calendar', 'ui.bootstrap', 'wu.masonry', 'ngAnimate', 'routeConfig', 'ngRoute', 'controllers', 'services', 'directives', 'filters'];

angular.module('app', dependencies);
//路由模块
angular.module('routeConfig', ['ngRoute']).config(function ($routeProvider) {
    var routes = [
        'personal/gridShow', 'personal/goodsFilter', 'common/carousel', 'common/datePicker', 'common/dropDown', 'common/pagination', 'common/typeAhead', 'common/tabs',
        'modules/calendar', 'modules/masonry'
    ];
    var setRoutes = function (route) {
        var url = '/' + route;
        var config = {
            //路由对应html文件必须放在views文件夹下
            templateUrl: 'views/' + route + '.html'
        };
        $routeProvider.when(url, config);

        return $routeProvider;
    };
    //循环获取路由网址
    routes.forEach(function (route) {
        return setRoutes(route);
    });
});//配置我们的路由

//分别生成各个分模块
this.controllersModule = angular.module('controllers', []);
this.servicesModule = angular.module('services', []);
this.directivesModule = angular.module('directives', []);
this.filtersModule = angular.module('filters', []);
this.masonryModule = angular.module('wu.masonry', []);
