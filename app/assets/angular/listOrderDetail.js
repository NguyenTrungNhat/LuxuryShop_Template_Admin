var app = angular.module('LuxuryShopAdmin',[]);
app.controller("OrderDetailCtrl", function ($scope, $http,$window){
    $scope.current_img = _current_img;
    if($window.sessionStorage.getItem("user")==null){
        $window.location.href = '/app/login-3.html';
    }
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    $scope.UserName = user.username;

    var keyemail = 'email';
    $scope.value = window.location.search.substring(window.location.search.indexOf(keyemail) + keyemail.length + 1);

    

    $scope.listOrderDetail;
    $scope.LoadOrderDetail = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            url: current_url + '/api/Carts/'+ $scope.value +'/GetListOrderByEmail',
        }).then(function (response) {
            $scope.listOrderDetail = response.data;
            console.log($scope.listOrderDetail);
        });
    }

    $scope.LoadOrderDetail();
});