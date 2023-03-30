var app = angular.module('LuxuryShopAdmin',[]);
app.controller("UserCtrl", function ($scope, $http,$window){
    if($window.sessionStorage.getItem("user")==null){
        $window.location.href = '/app/login-3.html';
    }
    $scope.host = current_img;

    $scope.UserID;
    $scope.FullName;
    $scope.BirthDay;
    $scope.Gender;
    $scope.Thumb = 'abc.jpg';
    $scope.Address;
    $scope.Email;
    $scope.Phone;
    $scope.UserName;
    $scope.Password;
    $scope.RoleID;

    $scope.listRole;
    $scope.listUser;
    
    $scope.page = 1;
    $scope.pageSize = 10;
    
    $scope.submit = "Thêm mới";

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

    $scope.LoadRole = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            url: current_url + '/api/Roles/GetAll',
        }).then(function (response) {
            $scope.listRole = response.data;
            console.log($scope.listRole);
        });
    };
    $scope.Save = function () {

        let user = {};
        user.UserID = $scope.UserID;
        user.FullName = $scope.FullName;
        user.BirthDay = $scope.BirthDay;
        user.Gender = $scope.Gender;
        user.Thumb = $scope.Thumb;
        user.Address = $scope.Address;
        user.Email = $scope.Email;
        user.Phone = $scope.Phone;
        user.UserName = $scope.UserName;
        user.Password = $scope.Password;
        user.RoleID = Number($scope.RoleID);

        var file = document.getElementById('Thumb').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Users/upload',
            }).then(function (res) {

                user.Thumb = res.data;

                if ($scope.submit == "Thêm mới") {
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
                        data: user,
                        url: current_url + '/api/Users/register',
                    }).then(function (response) {
                        $scope.LoadUser();
                        alert('Thêm user thành công!');
                    });
                } else {
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
                        data: user,
                        url: current_url + '/api/Users/update-user',
                    }).then(function (response) {
                        $scope.LoadUser();
                        alert('Cập nhật user thành công!');
                    });
                }
            });
        } else {
            user.Thumb = $scope.Thumb;
            if ($scope.submit == "Thêm mới") {
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
                    data: user,
                    url: current_url + '/api/Users/register',
                }).then(function (response) {
                    $scope.LoadUser();
                    alert('Thêm user thành công!');
                });
            } else {
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
                    data: user,
                    url: current_url + '/api/Users/update-user',
                }).then(function (response) {
                    $scope.LoadUser();
                    alert('Cập nhật user thành công!');
                });
            }
        }
    };

    $scope.Sua = function (obj) {
        var id = obj.userID;
        $scope.submit = "Lưu lại";
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            url: current_url + '/api/Users/get-by-id/' + id,
        }).then(function (response) {
            let User = response.data;
            $scope.UserID = User.userID;
            $scope.FullName = User.fullName;
            $scope.BirthDay = User.birthDay;
            $scope.Gender = User.gender;
            $scope.Thumb = User.thumb;
            $scope.UserName = User.userName;
            $scope.Password = User.password;
            $scope.Email = User.email;
            $scope.Address = User.address;
            $scope.Phone = User.phone;
            $scope.RoleID = User.roleID + '';
        });
    };
    $scope.Xoa = function (obj) {
        var id = obj.userID;
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'DELETE',                
                headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
                url: current_url + '/api/Users/delete-user/' + id,
            }).then(function (response) {
                $scope.LoadUser();
                alert('Xóa thành công!');
            });
        } 
    };

    $scope.LoadUser();
    $scope.LoadRole();
});