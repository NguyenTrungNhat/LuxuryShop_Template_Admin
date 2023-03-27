var app = angular.module('LuxuryShopAdmin',[]);
app.controller("HomeCtrl", function ($scope, $http,$window){
    if($window.sessionStorage.getItem("user")==null){
        $window.location.href = '/app/login-3.html';
    }
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    $scope.UserName = user.username;
    $scope.Token = user.token;


    $scope.logout = function() {
        $window.sessionStorage.removeItem("user");
        $window.location.href = '/app/login-3.html';
    }
});