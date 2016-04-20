/**
 * Created by Stephen on 2016/4/20.
 */
filtersModule.filter("ListFilter", function () {
    return function (array, attr, minValue, maxValue) {
        if (!angular.isArray(array)) {
            console.error("The " + array + " is not an array or a list !");
        }
        if (minValue) {
            if (!angular.isNumber(minValue)) {
                console.error("The " + minValue + " is not a number !");
            }
        } else {
            minValue = 0;
        }
        if (maxValue) {
            if (!angular.isNumber(maxValue)) {
                console.error("The " + maxValue + " is not a number !");
            }
        } else {
            maxValue = Number.MAX_VALUE;
        }
        var newArray = [];
        angular.forEach(array, function (value, key) {
            if (angular.isObject(value)) {
                if (angular.isDefined(value[attr])) {
                    if (angular.isNumber(value[attr])) {
                        if (Number(value[attr]) >= Number(minValue) && Number(value[attr]) <= Number(maxValue)) {
                            newArray.push(value);
                        }
                    }
                } else {
                    console.error("The " + value + " does not contain the attribute " + attr + " !");
                }
            } else {
                if (angular.isNumber(value)) {
                    if (Number(value) >= Number(minValue) && Number(value) <= Number(maxValue)) {
                        newArray.push(value);
                    }
                }
            }
        });
        return newArray;
    }
});