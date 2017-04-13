(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('UserPublicInfoCtrl', userPublicInfoCtrl);

  function userPublicInfoCtrl($scope, $rootScope, $state, $q, $timeout, UserService, LearnerService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading[0] = true;
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;
    vm.userId = vm.$state.params.userId;
    UserService.getUserInfo($scope.user.id, 'info')
      .then(function(res) {
      	vm.info = res.data;
        $scope.loading[0] = false;
      }, function(res) {
        // $scope.loading[0] = false;
        $scope.showMessage('danger');
      });
  }
}());
