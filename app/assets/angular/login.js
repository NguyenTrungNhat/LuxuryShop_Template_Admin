var app = angular.module('LuxuryShopAdmin',[]);
app.controller("LoginCtrl", function ($scope, $http,$window){
    $scope.Token;  
    $scope.getToken = function () { 		 
        $http({
            method: 'POST', 
            data: { UserName: $scope.userName, Password: $scope.password },
            url: current_url + '/api-admin/user/authenticate',
        }).then(function (response) { 
            $scope.Token = response.data;
            console.log($scope.Token);
            json = {
                username: $scope.userName,
                token : $scope.Token
            }
            $window.sessionStorage.setItem('user', JSON.stringify(json));
            $window.location.href = '/app/index.html';
        },function(error){
            alert(error.data);
            $window.location.href = '/app/login-3.html';
        });
    }; 
});