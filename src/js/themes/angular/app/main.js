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
        $scope.user = null;

        $scope.signout = function() {
          $scope.loading = true;
          UserService.signout(function(res) {
            $scope.loading = false;
            $scope.$state.go('login');
          });
        };
        $scope.showMessage = function(type, msg) {
          var message = msg || 'Failed to proceed.';
          ngToast.create({
            className: type,
            content: message,
            dismissOnTimeout: type === 'danger' ? false : true
          });
        };
      }
    ]);

})();
