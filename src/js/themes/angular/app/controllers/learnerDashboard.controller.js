(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('LearnerDashboardCtrl', learnerDashboardCtrl);

  function learnerDashboardCtrl($scope, $rootScope, $state, $q, $timeout, UserService, LearnerService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading[0] = true;
    // $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;
    vm.getLearningCourses = function(callback) {
      LearnerService.getLearningCourses()
        .then(function(res) {
          vm.learningCourses = res.data;
          if (callback) {
            callback();
          }
        }, function(res) {
          $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getCompletedCourses = function() {
      UserService.getUserInfo($scope.user.id, 'completions')
        .then(function(res) {
          $scope.loading[0] = false;
          vm.completedCourses = res.data;
        }, function(res) {
          // $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getMyProjects = function(callback) {
      LearnerService.getProjects()
        .then(function(res) {
          vm.myProjects = res.data.workspaces;
          $scope.loading[0] = false;
          if (callback) {
            callback();
          }
        }, function(res) {
          // $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getMyBadges = function(callback) {
      UserService.getUserInfo($scope.user.id, 'achievements')
        .then(function(res) {
          vm.myBadges = res.data;
          if (callback) {
            callback();
          } else {
            $scope.loading[0] = false;
          }
        }, function(res) {
          // $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.fetchData = function() {
      vm.getLearningCourses(function() {
        vm.getMyProjects(function() {
          vm.getMyBadges(function() {
            $timeout(function() {
              $rootScope.$broadcast('masonry.reload');
              $scope.loading[0] = false;
            }, 100);
          });
        });
      });
    };

    $scope.$watch('vm.$state.params.page', function(newVal, oldVal) {
      if (vm.$state.params.page === 'dashboard') {
        vm.fetchData();
      }
      if (vm.$state.params.page === 'my-courses') {
        vm.getLearningCourses(function() {
          vm.getCompletedCourses();
        });
      }
      if (vm.$state.params.page === 'my-projects') {
        vm.getMyProjects();
      }
    });
  }
}());
