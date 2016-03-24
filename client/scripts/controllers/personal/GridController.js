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

/**
 * 后台代码： php
 * $product = new Product();

 // 获取表中总行数
 // 由于只要获取总行数，count(id)性能很好啊，千万不要用*哦，不然你就是作死
 $total = $product->query('select count(id) as rows from product');
 $total = $total[0]['rows'];

 // 只需要获取当前页要展示的数据
 $postData = json_decode(file_get_contents("php://input")); // 接收post过来的数据

 $currentPage = $postData->currentPage; // 获取当前页
 $perPage = $postData->itemsPerPage; // 获取每页多少条数据
 $offset = ($currentPage - 1) * $perPage; // 计算偏移量

 $sql = "select * from product limit $offset, $perPage";
 $items = $product->query($sql);

 // 组成产品信息数组
 $productInfo = [
 'total' => $total,
 'items' => $items
 ];

 // 以json格式进行输出，方便js进行操作
 echo json_encode($productInfo);
 */
