(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('ActivateController', activateCtrl);

  function activateCtrl($scope, $rootScope, $state, UserService, ngToast) {
    $scope.loading = [true];
    if (!$state.params.email || !$state.params.token) {
      $state.go('main.courses');
      return;
    }
    UserService.activate(decodeURIComponent($state.params.email), $state.params.token)
      .then(function(res) {
        $scope.loading[0] = false;
        $state.go('login');
        ngToast.create({
          className: 'success',
          content: 'Kích hoạt email thành công!',
          timeout: '5000'
        });
      }, function(res) {
      	$scope.loading[0] = false;
        $state.go('main.courses');
        ngToast.danger({
          content: 'Thông tin kích hoạt không hợp lệ.',
          timeout: 5000
            // dismissOnTimeout: false
        });
      });
  }
}());
