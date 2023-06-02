var app = angular.module('LuxuryShopAdmin', []);
app.controller("UserCtrl", function ($scope, $http, $window) {
    $scope.current_img = _current_img;
    var keyproduct = 'ProductID';
    $scope.id = window.location.search.substring(window.location.search.indexOf(keyproduct) + keyproduct.length + 1);
    console.log($scope.id);
    if ($window.sessionStorage.getItem("user") == null) {
        $window.location.href = '/app/login-3.html';
    }
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    $scope.UserName = user.username;

    $scope.ListProductImageID;
    $scope.Caption;
    $scope.IsDefault;
    $scope.SortOrder;
    $scope.ImageFile;
    $scope.file;

    $scope.submit = "Thêm mới";


    // $scope.Save = function () {
    //     const formData = new FormData();

    //     formData.append('Caption', $scope.Caption);
    //     formData.append('IsDefault', $scope.IsDefault);
    //     formData.append('SortOrder', Number($scope.SortOrder));
    //     var file = document.getElementById('ImageFile').files[0];
    //     formData.append('ImageFile', file);
    //     $http({
    //         method: 'POST',
    //         transformRequest: angular.identity,
    //         headers: {
    //             "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token,
    //             'Content-Type': undefined
    //         },
    //         data: formData,
    //         url: current_url + '/api-admin/san-pham/' + 'images/' + $scope.id,
    //     }).then(function (response) {
    //         $scope.LoadProduct();
    //         alert('Thêm ảnh cho sản phẩm công 1!');

    //     });
    // };


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
                url: current_url + '/api-admin/san-pham/' + 'images/' + $scope.id,
            }).then(function (response) {
                $scope.LoadProduct();
                alert('Thêm ảnh cho sản phẩm công !');

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
                url: current_url + '/api-admin/san-pham/images/' + $scope.ListProductImageID,
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
                url: current_url + '/api-admin/san-pham/images/' + id,
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
            url: current_url + '/api-admin/san-pham/' + 'image/GetListImage/' + $scope.id ,
        }).then(function (response) {
            $scope.listImageProducts = response.data;
            console.log($scope.listImageProducts)
        });
    }
    $scope.LoadProduct();

});