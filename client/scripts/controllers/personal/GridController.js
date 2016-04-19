/**
 * Created by Stephen on 2016/3/20.
 */
controllersModule.controller('GridCtrl', function ($scope, $filter) {
    $scope.searchKeywords = '';
    $scope.row = '';

    // 重新获取数据条目
    var reGetProducts = function () {
        // 发送给后台的请求数据
        var postData = {
            currentPage: $scope.paginationConf.currentPage,
            itemsPerPage: $scope.paginationConf.itemsPerPage
        };
        $scope.products = [];
        $scope.productList = [
            {name: 'Nijiya Market', price: '$$', sales: 292, rating: 4.0},
            {name: 'Eat On Monday Truck', price: '$', sales: 119, rating: 4.3},
            {name: 'Tea Era', price: '$', sales: 874, rating: 4.0},
            {name: 'Rogers Deli', price: '$', sales: 347, rating: 4.2},
            {name: 'MoBowl', price: '$$$', sales: 24, rating: 4.6},
            {name: 'The Milk Pail Market', price: '$', sales: 543, rating: 4.5},
            {name: 'Nob Hill Foods', price: '$$', sales: 874, rating: 4.0},
            {name: 'Scratch', price: '$$$', sales: 643, rating: 3.6},
            {name: 'Gochi Japanese Fusion Tapas', price: '$$$', sales: 56, rating: 4.1},
            {name: 'Cost Plus World Market', price: '$$', sales: 79, rating: 4.0},
            {name: 'Bumble Bee Health Foods', price: '$$', sales: 43, rating: 4.3},
            {name: 'Costco', price: '$$', sales: 219, rating: 3.6},
            {name: 'Red Rock Coffee Co', price: '$', sales: 765, rating: 4.1},
            {name: '99 Ranch Market', price: '$', sales: 181, rating: 3.4},
            {name: 'Mi Pueblo Food Center', price: '$', sales: 78, rating: 4.0},
            {name: 'Cucina Venti', price: '$$', sales: 163, rating: 3.3},
            {name: 'Sufi Coffee Shop', price: '$', sales: 113, rating: 3.3},
            {name: 'Dana Street Roasting', price: '$', sales: 316, rating: 4.1},
            {name: 'Pearl Cafe', price: '$', sales: 173, rating: 3.4},
            {name: 'Posh Bagel', price: '$', sales: 140, rating: 4.0},
            {name: 'Artisan Wine Depot', price: '$$', sales: 26, rating: 4.1},
            {name: 'Hong Kong Chinese Bakery', price: '$', sales: 182, rating: 3.4},
            {name: 'Starbucks', price: '$$', sales: 97, rating: 3.7},
            {name: 'Tapioca Express', price: '$', sales: 301, rating: 3.0},
            {name: 'House of Bagels', price: '$', sales: 82, rating: 4.4}
        ];
        // 变更分页的总数
        $scope.paginationConf.totalItems = $scope.productList.length;
        //获取分页序号
        var startIndex = (postData.currentPage - 1) * postData.itemsPerPage;
        var endIndex = postData.currentPage * postData.itemsPerPage - 1;
        // console.log("startIndex="+startIndex+" endIndex="+endIndex);
        //分页获取数据,变更产品条目
        for (var i in $scope.productList) {
            if (Number(i) >= Number(startIndex) && Number(i) <= Number(endIndex)) {
                $scope.products.push($scope.productList[i]);
            }
        }
        $scope.filterProducts = $scope.products;
        if ($scope.row) {
            $scope.filterProducts = $filter('orderBy')($scope.products, $scope.row);
        }
    };

    // 配置分页基本参数
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10
    };

    // 通过$watch currentPage和itemperPage 当他们一变化的时候，重新获取数据条目
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetProducts);

    // 排序
    $scope.order = function (rowName) {
        if ($scope.row == rowName) {
            return;
        }
        $scope.row = rowName;
        $scope.filterProducts = $filter('orderBy')($scope.products, rowName);
    };

    //筛选
    $scope.search = function () {
        $scope.filterProducts = $filter('filter')($scope.products, $scope.searchKeywords);
        $scope.row = '';
        if (!$scope.searchKeywords) {
            $scope.filterProducts = $scope.products;
        }
    }
});
