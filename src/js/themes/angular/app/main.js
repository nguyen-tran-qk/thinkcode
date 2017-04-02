(function() {
  "use strict";

  angular.module('app')
    .controller('AppCtrl', ['$scope', '$state', '$interval', 'UserService', 'BadgeService', 'ngToast',

      function($scope, $state, $interval, UserService, BadgeService, ngToast) {

        $scope.app = {
          settings: {
            htmlClass: '',
            bodyClass: ''
          }
        };
        $scope.loading = [true];
        $scope.$state = $state;
        $scope.userCheck = undefined;
        $scope.setUserCheck = function() {
          if (!angular.isDefined($scope.userCheck)) {
            $scope.userCheck = $interval(function() {
              UserService.checkUser()
                .then(function(res) {}, function(res) {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  $scope.$state.go('main.courses', { type: 'published' }, { reload: true });
                  $scope.unsetUserCheck();
                  ngToast.create({
                    className: 'danger',
                    content: 'Bạn đã bị đăng xuất khỏi hệ thống. Vui lòng đăng nhập lại.',
                    timeout: '5000'
                  });
                });
            }, 15000);
          }
        };
        $scope.unsetUserCheck = function() {
          if (angular.isDefined($scope.userCheck)) {
            $interval.cancel($scope.userCheck);
            $scope.userCheck = undefined;
          }
        };
        if (localStorage.token) {
          $scope.setUserCheck();
        } else {
          $scope.unsetUserCheck();
        }

        $scope.user = UserService.getUser();
        $scope.allBadges = [];

        BadgeService.getBadges(function(res) {
          $scope.allBadges = res.data;
        }, function(res) {
          $scope.allBadges = [];
        });

        $scope.signout = function() {
          $scope.loading[0] = true;
          UserService.signout(function(res) {
            $scope.loading[0] = false;
            $scope.unsetUserCheck();
            $scope.$state.go('main.courses', { type: 'published' }, { reload: true });
          });
        };
        $scope.showMessage = function(type, msg) {
          var message = msg || 'Xin lỗi, thao tác thất bại.';
          ngToast.create({
            className: type,
            content: message,
            timeout: '5000'
          });
        };
        $scope.goTo = function(state, params) {
          if (!params) {
            params = {};
          }
          $state.go(state, params, { reload: true });
        };
        $scope.transitionTo = function(state, params) {
          if (!params) {
            params = {};
          }
          $state.transitionTo(state, params, { notify: false });
        };
      }
    ]);

})();
