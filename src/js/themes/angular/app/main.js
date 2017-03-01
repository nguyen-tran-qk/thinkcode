(function() {
  "use strict";

  angular.module('app')
    .controller('AppCtrl', ['$scope', '$state', 'UserService',

      function($scope, $state) {

        $scope.app = {
          settings: {
            htmlClass: '',
            bodyClass: ''
          }
        };

        $scope.$state = $state;
        $scope.user = null;

        $scope.signout = function() {
          UserService.signout(function(res) {
            $scope.$state.go('login');
          });
        };

      }
    ]);

})();
