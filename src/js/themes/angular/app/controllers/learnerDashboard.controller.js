(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('LearnerDashboardCtrl', learnerDashboardCtrl);

  function learnerDashboardCtrl($scope, $rootScope, $state, $q, UserService, LearnerService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading[0] = true;
    $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;
    vm.getMyCourses = function(callback) {
      LearnerService.getLearningCourses()
        .then(function(res) {
          vm.myCourses = res.data;
          if (callback) {
            callback();
          }
        }, function(res) {
          $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getMyProjects = function(callback) {
      LearnerService.getProjects()
        .then(function(res) {
          vm.myProjects = res.data.workspaces;
          if (callback) {
            callback();
          }
        }, function(res) {
          $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.fetchData = function() {
      vm.getMyCourses(function() {
        vm.getMyProjects(function() {
          $scope.loading[0] = false;
        });
      });
    };
    vm.fetchData();
  }
}());
