/**
 * Created by Stephen on 2016/3/20.
 */
controllersModule.controller('GridCtrl', function ($scope, $http) {
    // 重新获取数据条目
    var reGetProducts = function () {
        // 发送给后台的请求数据
        var postData = {
            currentPage: $scope.paginationConf.currentPage,
            itemsPerPage: $scope.paginationConf.itemsPerPage
        };

        $http.post('http://demo.miaoyueyue.com/php/demo/1/getProducts.php?', postData).success(function (data) {
            // 变更分页的总数
            $scope.paginationConf.totalItems = data.total;
            // 变更产品条目
            $scope.products = data.items;
        });
    };

    // 配置分页基本参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 15
    };

    // 通过$watch currentPage和itemperPage 当他们一变化的时候，重新获取数据条目
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetProducts);
});
