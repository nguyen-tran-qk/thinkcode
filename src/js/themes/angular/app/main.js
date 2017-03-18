(function() {
  "use strict";

  angular.module('app')
    .controller('AppCtrl', ['$scope', '$state', 'UserService', 'ngToast',

      function($scope, $state, UserService, ngToast) {

        $scope.app = {
          settings: {
            htmlClass: '',
            bodyClass: ''
          }
        };

        $scope.$state = $state;
        $scope.user = UserService.getUser();
        // $scope.user = null;

        $scope.signout = function() {
          $scope.loading = true;
          UserService.signout(function(res) {
            $scope.loading = false;
            $scope.$state.go('main.courses', {}, { reload: true });
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
