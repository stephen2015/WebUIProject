/**
 * Created by Stephen on 2016/4/19.
 */
controllersModule.controller('GoodsFilterCtrl', function ($scope, $filter) {
    $scope.searchKeywords = '';
    $scope.row = '';
    $scope.tempList = [];
    $scope.productList = [
        {name: 'Nijiya Market', price: 20, sales: 292, rating: 4.0},
        {name: 'Eat On Monday Truck', price: 30, sales: 119, rating: 4.3},
        {name: 'Tea Era', price: 10, sales: 874, rating: 4.0},
        {name: 'Rogers Deli', price: 15, sales: 347, rating: 4.2},
        {name: 'MoBowl', price: 80, sales: 24, rating: 4.6},
        {name: 'The Milk Pail Market', price: 10, sales: 543, rating: 4.5},
        {name: 'Nob Hill Foods', price: 30, sales: 874, rating: 4.0},
        {name: 'Scratch', price: 100, sales: 643, rating: 3.6},
        {name: 'Gochi Japanese Fusion Tapas', price: 120, sales: 56, rating: 4.1},
        {name: 'Cost Plus World Market', price: 60, sales: 79, rating: 4.0},
        {name: 'Bumble Bee Health Foods', price: 50, sales: 43, rating: 4.3},
        {name: 'Costco', price: 70, sales: 219, rating: 3.6},
        {name: 'Red Rock Coffee Co', price: 15, sales: 765, rating: 4.1},
        {name: '99 Ranch Market', price: 20, sales: 181, rating: 3.4},
        {name: 'Mi Pueblo Food Center', price: 10, sales: 78, rating: 4.0},
        {name: 'Cucina Venti', price: 40, sales: 163, rating: 3.3},
        {name: 'Sufi Coffee Shop', price: 15, sales: 113, rating: 3.3},
        {name: 'Dana Street Roasting', price: 12, sales: 316, rating: 4.1},
        {name: 'Pearl Cafe', price: 10, sales: 173, rating: 3.4},
        {name: 'Posh Bagel', price: 20, sales: 140, rating: 4.0},
        {name: 'Artisan Wine Depot', price: 45, sales: 26, rating: 4.1},
        {name: 'Hong Kong Chinese Bakery', price: 25, sales: 182, rating: 3.4},
        {name: 'Starbucks', price: 36, sales: 97, rating: 3.7},
        {name: 'Tapioca Express', price: 15, sales: 301, rating: 3.0},
        {name: 'House of Bagels', price: 24, sales: 82, rating: 4.4}
    ];
    $scope.tempList = angular.copy($scope.productList);

    // 重新获取数据条目
    var reGetProducts = function () {
        // 发送给后台的请求数据
        var postData = {
            currentPage: $scope.paginationConf.currentPage,
            itemsPerPage: $scope.paginationConf.itemsPerPage
        };
        $scope.products = [];
        // 变更分页的总数
        $scope.paginationConf.totalItems = $scope.tempList.length;
        //获取分页序号
        var startIndex = (postData.currentPage - 1) * postData.itemsPerPage;
        var endIndex = postData.currentPage * postData.itemsPerPage - 1;
        // console.log("startIndex="+startIndex+" endIndex="+endIndex);
        //分页获取数据,变更产品条目
        for (var i in $scope.tempList) {
            if (Number(i) >= Number(startIndex) && Number(i) <= Number(endIndex)) {
                $scope.products.push($scope.tempList[i]);
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
        itemsPerPage: 5,
        perPageOptions: [5, 8]
    };

    // 通过$watch currentPage和itemperPage 当他们一变化的时候，重新获取数据条目
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetProducts);

    // 排序
    $scope.order = function (rowName) {
        if ($scope.row == rowName) {
            rowName = "-" + rowName
        }
        $scope.row = rowName;
        $scope.filterProducts = $filter('orderBy')($scope.products, rowName);
    };

    //筛选
    $scope.search = function () {
        $scope.row = '';
        $scope.tempList = $filter('filter')($scope.productList, $scope.searchKeywords);
        reGetProducts();
    };

    //筛选带条件
    $scope.listFilter = function (attr, minValue, maxValue) {
        if (attr) {
            if ($scope.row == attr) {
                $scope.tempList = $scope.productList;
            }
            $scope.row = attr;
            $scope.tempList = $filter('ListFilter')($scope.tempList, attr, minValue, maxValue);
            reGetProducts();
        }
    };
});

