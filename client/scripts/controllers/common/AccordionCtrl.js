/**
 * Created by Stephen on 2016/3/20.
 */

controllersModule.controller('AccordionCtrl', function ($scope) {
    $scope.oneAtTime = true;

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
