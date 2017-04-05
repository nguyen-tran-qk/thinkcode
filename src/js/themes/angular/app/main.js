(function() {
  "use strict";

  angular.module('app')
    .controller('AppCtrl', ['$scope', '$state', '$interval', '$q', 'UserService', 'BadgeService', 'ngToast', '$firebaseObject', '$firebaseArray',

      function($scope, $state, $interval, $q, UserService, BadgeService, ngToast, $firebaseObject, $firebaseArray) {

        $scope.app = {
          settings: {
            htmlClass: '',
            bodyClass: ''
          }
        };
        
      }
    ]);

})();
