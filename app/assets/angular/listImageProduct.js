var app = angular.module('LuxuryShopAdmin',[]);
app.controller("UserCtrl", function ($scope, $http,$window){
    $scope.current_img = _current_img;
    if($window.sessionStorage.getItem("user")==null){
        $window.location.href = '/app/login-3.html';
    }
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    $scope.UserName = user.username;
    

    $scope.page = 2;
    $scope.pageSize = 10;
    $scope.listProducts;
    $scope.LoadProduct = function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url: current_url + '/api-admin/san-pham/getAllPaging',
        }).then(function (response) {
            $scope.listProducts = response.data.data;
            console.log($scope.listProducts)
        });
    }

    $scope.Sua = function (item) {
        $window.location.href = '/app/listImageProductDetail.html?ProductID=' + item.productID;
    }
    $scope.LoadProduct();
});