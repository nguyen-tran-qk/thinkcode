(function() {
  "use strict";

  angular.module('app')
    .controller('AppCtrl', ['$scope', '$state', 'UserService', 'BadgeService', 'ngToast',

      function($scope, $state, UserService, BadgeService, ngToast) {

        $scope.app = {
          settings: {
            htmlClass: '',
            bodyClass: ''
          }
        };
        $scope.loading = false;
        $scope.$state = $state;
        $scope.user = UserService.getUser();
        $scope.allBadges = [];
        
        BadgeService.getBadges(function(res) {
          $scope.allBadges = res.data;
        }, function(res) {
          $scope.allBadges = [];
        });

        $scope.signout = function() {
          $scope.loading = true;
          UserService.signout(function(res) {
            $scope.loading = false;
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
      }
    ]);

})();
