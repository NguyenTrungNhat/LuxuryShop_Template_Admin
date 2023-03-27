var app = angular.module('LuxuryShopAdmin',[]);
app.controller("UserCtrl", function ($scope, $http,$window){
    if($window.sessionStorage.getItem("user")==null){
        $window.location.href = '/app/login-3.html';
    }
    $scope.page = 1;
    $scope.pageSize = 10;

    $scope.listUser;

    $scope.LoadUser = function(){
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url: current_url + '/api/users/getUsersPaging',
        }).then(function (response) {
            $scope.listUser = response.data.data;
            console.log($scope.listUser)
        });
    }
});