(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('BadgesController', BadgesController);

  function BadgesController($scope, $rootScope, $state, BadgeService, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
    $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;

    vm.fetchBadges = function() {
      BadgeService.getBadges(function(res) {
        vm.badges = res.data;
        $scope.loading = false;
      }, function(res) {
        $scope.showMessage('danger');
      });
    };
    vm.fetchBadges();

    vm.selectBadge = function(id) {
      BadgeService.getBadgeById(id, function(res) {
        vm.selectedBadge = res.data;
      }, function(res) {
        $scope.showMessage('danger');
      });
    };
  }
})();
