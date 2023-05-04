var app = angular.module('LuxuryShopAdmin',[]);
app.controller("OrderCtrl", function ($scope, $http,$window){
    $scope.current_img = _current_img;
    if($window.sessionStorage.getItem("user")==null){
        $window.location.href = '/app/login-3.html';
    }
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    $scope.UserName = user.username;
    

    $scope.listOrder;
    $scope.LoadOrder = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            url: current_url + '/api/Carts/GetListCartAll',
        }).then(function (response) {
            $scope.listOrder = response.data;
            console.log($scope.listOrder);
        });
    }

    $scope.Sua = function (item) {
        $http({
            method: 'PUT',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            url: current_url + '/api/Carts/' + item.orderID +'/Update-Status',
        }).then(function (response) {
            $scope.LoadOrder();
            alert('Đã xác nhận giao hàng');
        });
    }

    $scope.ChiTietDonHang = function(item) {
        $window.location.href = 'cartDetail.html?email=' + item.email;
    }
    $scope.LoadOrder();
});