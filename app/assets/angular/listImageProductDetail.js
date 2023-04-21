var app = angular.module('LuxuryShopAdmin', []);
app.controller("UserCtrl", function ($scope, $http, $window) {
    var keyproduct = 'ProductID';
    $scope.id = window.location.search.substring(window.location.search.indexOf(keyproduct) + keyproduct.length + 1);
    console.log($scope.id);
    if ($window.sessionStorage.getItem("user") == null) {
        $window.location.href = '/app/login-3.html';
    }
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    $scope.UserName = user.username;

    $scope.host = current_img;

    $scope.ListProductImageID;
    $scope.Caption;
    $scope.IsDefault;
    $scope.SortOrder;
    $scope.ImageFile;
    $scope.file;

    $scope.submit = "Thêm mới";


    $scope.Save = function () {
        const formData = new FormData();

        formData.append('Caption', $scope.Caption);
        formData.append('IsDefault', $scope.IsDefault);
        formData.append('SortOrder', Number($scope.SortOrder));
        var file = document.getElementById('ImageFile').files[0];
        formData.append('ImageFile', file);
        $http({
            method: 'POST',
            transformRequest: angular.identity,
            headers: {
                "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token,
                'Content-Type': undefined
            },
            data: formData,
            url: current_url + '/api/Product/' + $scope.id + '/images',
        }).then(function (response) {
            $scope.LoadProduct();
            alert('Thêm sản ảnh cho sản phẩm công!');

        });
    };


    $scope.Save = function () {
        const formData = new FormData();
        if ($scope.submit == "Thêm mới") {
            formData.append('Caption', $scope.Caption);
            formData.append('IsDefault', $scope.IsDefault);
            formData.append('SortOrder', Number($scope.SortOrder));
            var file = document.getElementById('ImageFile').files[0];
            formData.append('ImageFile', file);
            $http({
                method: 'POST',
                transformRequest: angular.identity,
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Product/' + $scope.id + '/images',
            }).then(function (response) {
                $scope.LoadProduct();
                alert('Thêm sản ảnh cho sản phẩm công!');

            });
        } else {
            formData.append('Caption', $scope.Caption);
            formData.append('IsDefault', $scope.IsDefault);
            formData.append('SortOrder', Number($scope.SortOrder));
            var file = document.getElementById('ImageFile').files[0];
            formData.append('ImageFile', file);
            $http({
                method: 'PUT',
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/images/' + $scope.ListProductImageID,
            }).then(function (response) {
                $scope.LoadProduct();
                alert('Cập nhật ảnh sản phẩm thành công!');
            });
        }
    };

    $scope.Sua = function (obj) {
        console.log(obj)
        $scope.ListProductImageID = obj.listProductImageID;
        $scope.submit = "Lưu lại";
        $scope.Caption = obj.caption;
        $scope.IsDefault = obj.isDefault;
        $scope.SortOrder = obj.sortOrder;
    };

    $scope.Xoa = function (obj) {
        var id = obj.listProductImageID;
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'DELETE',
                headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
                url: current_url + '/images/' + id,
            }).then(function (response) {
                $scope.LoadProduct();
                alert('Xóa thành công!');
            });
        }
    };

    $scope.listImageProducts;
    $scope.LoadProduct = function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            url: current_url + '/api/Product/' + $scope.id + '/image/GetListImage',
        }).then(function (response) {
            $scope.listImageProducts = response.data;
            console.log($scope.listImageProducts)
        });
    }
    $scope.LoadProduct();

});