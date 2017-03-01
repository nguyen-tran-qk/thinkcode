(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('UsersController', userCtrl);

  function userCtrl($scope, $rootScope, $state, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.websiteLogin;
    $scope.app.settings.bodyClass = 'login';
    var vm = this;

    vm.signin = function() {
      var data = {
        auth: {
          username: vm.username,
          password: vm.password
        }
      }
      UserService.signin(data, function(res) {
      	if (res.data.jwt) {
      		$scope.user = true;
      		localStorage.jwt = res.data.jwt;
      		$state.go('main.workspaces');
      	}
      }, function(res) {});
    };
  }
})();
