var app = angular.module('LuxuryShopAdmin', []);
app.controller("ProductsCtrl", function ($scope, $http, $window) {
    if ($window.sessionStorage.getItem("user") == null) {
        $window.location.href = '/app/login-3.html';
    }
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    $scope.UserName = user.username;
    
    $scope.host = current_img;

    $scope.ProductID;
    $scope.CatID;
    $scope.Discount;
    $scope.UnitslnStock;
    $scope.Name;
    $scope.Details;
    $scope.editorData;
    $scope.Description;
    $scope.SeoDescription;
    $scope.Title;
    $scope.SeoTitle;
    $scope.LanguageId;
    $scope.SeoAlias;
    $scope.Price;
    $scope.file;

    $scope.listProducts;

    $scope.page = 1;
    $scope.pageSize = 10;

    $scope.submit = "Thêm mới";

    $scope.LoadProduct = function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            data: { page: $scope.page, pageSize: $scope.pageSize },
            url: current_url + '/api/Product/getAllPaging',
        }).then(function (response) {
            $scope.listProducts = response.data.data;
            console.log($scope.listProducts)
        });
    }
    $scope.Save = function () {
        const formData = new FormData();
        if ($scope.submit == "Thêm mới") {
            formData.append('CatID', Number($scope.CatID));
            formData.append('Discount', Number($scope.Discount));
            formData.append('UnitslnStock', Number($scope.UnitslnStock));
            formData.append('Name', $scope.Name);
            formData.append('Details', $scope.editorData);
            formData.append('Description', $scope.Description);
            formData.append('SeoDescription', $scope.SeoDescription);
            formData.append('Title', $scope.Title);
            formData.append('SeoTitle', $scope.SeoTitle);
            formData.append('LanguageId', $scope.LanguageId);
            formData.append('SeoAlias', $scope.SeoAlias);
            formData.append('Price', Number($scope.Price));
            var file = document.getElementById('ThumbnailImage').files[0];
            formData.append('ThumbnailImage', file);
            $http({
                method: 'POST',
                transformRequest: angular.identity,
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Product/CreateProduct',
            }).then(function (response) {
                $scope.LoadProduct();
                alert('Thêm sản phẩm thành công!');
            });
        } else {
            formData.append('Id', Number($scope.ProductID));
            formData.append('LanguageId', $scope.LanguageId);
            formData.append('Name', $scope.Name);
            formData.append('Description', $scope.Description);
            formData.append('Details',  $scope.editorData);
            formData.append('SeoDescription', $scope.SeoDescription);
            formData.append('SeoTitle', $scope.SeoTitle);
            formData.append('SeoAlias', $scope.SeoAlias);
            $http({
                method: 'PUT',
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Product/Update-Product',
            }).then(function (response) {
                $scope.LoadProduct();
                alert('Cập nhật sản phẩm thành công!');
            });
        }
    };

    $scope.Sua = function (obj) {
        var id = obj.productID;
        $scope.submit = "Lưu lại";
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
            url: current_url + '/api/Product/' + id+'/vi-VN',
        }).then(function (response) {
            $scope.ProductID = response.data.productID;
            $scope.CatID = response.data.catID;
            $scope.LanguageId = response.data.languageId;
            $scope.Name = response.data.name;
            $scope.Description = response.data.description;
            $scope.Details = response.data.details;
            $scope.SeoDescription = response.data.seoDescription;
            $scope.SeoTitle = response.data.seoTitle;
            $scope.SeoAlias = response.data.seoAlias;
        });
    };
    $scope.Xoa = function (obj) {
        var id = obj.productID;
        var result = confirm("Bạn có thực sự muốn xóa không?");
        if (result) {
            $http({
                method: 'DELETE',
                headers: { "Authorization": 'Bearer ' + JSON.parse($window.sessionStorage.getItem("user")).token },
                url: current_url + '/api/Product/' + id,
            }).then(function (response) {
                $scope.LoadProduct();
                alert('Xóa thành công!');
            });
        }
    };

    $scope.LoadProduct();
    
});

app.directive('ckeditor', () => {
    return {
      require: '?ngModel',
      link: function (scope, element, attr, ngModel) {
        if (!ngModel) return;
         ClassicEditor
          .create(element[0])
          .then(editor => {
            editor.model.document.on('change:data', () => {
              ngModel.$setViewValue(editor.getData());
              // Only `$apply()` when there are changes, otherwise it will be an infinite digest cycle
              if (editor.getData() !== ngModel.$modelValue) {
                scope.$apply();
              }
            });
            ngModel.$render = () => {
              editor.setData(ngModel.$modelValue);
            };
            scope.$on('$destroy', () => {
              editor.destroy();
            });
          });
      }
    };
  });