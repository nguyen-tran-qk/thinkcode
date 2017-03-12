(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('UsersController', userCtrl);

  function userCtrl($scope, $rootScope, $state, UserService, ngToast) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.websiteLogin;
    $scope.app.settings.bodyClass = 'login';
    var vm = this;
    vm.$state = $state;

    function showMessage(res) {
      if (res.data) {
        var msg;
        if (res.data.message) {
          ngToast.danger({
            content: res.data.message,
            timeout: 3000
              // dismissOnTimeout: false
          });
        } else {
          for (var i = res.data.length - 1; i >= 0; i--) {
            msg = res.data[i].error;
            ngToast.danger({
              content: msg,
              timeout: 3000
                // dismissOnTimeout: false
            });
          }
        }
      }
    }

    if (vm.$state.current.name === 'login') {
      vm.signin = function() {
        if (vm.validForm()) {
          var data = {
            auth: {
              username: vm.username,
              password: vm.password
            }
          }
          UserService.signin(data, function(res) {
            if (res.data.session) {
              $state.go('main.courses');
            }
          }, function(res) {
            $scope.showMessage('danger', 'Thông tin đăng nhập không chính xác.');
          });
        }
      };

      vm.validForm = function() {
        return vm.username && vm.password;
      };
    } else if (vm.$state.current.name === 'sign-up') {
      vm.pwdMatched = true;
      vm.signup = function() {
        if (vm.validForm()) {
          var data = {
            user: {
              username: vm.username,
              password: vm.password
            }
          }
          UserService.signup(data, function(res) {
            $state.go('main.courses');
          }, function(res) {
            showMessage(res);
          });
        }
      };

      vm.validForm = function() {
        return vm.username && vm.password && vm.confirmPassword && vm.pwdMatched;
      };

      $scope.$watchGroup(['vm.password', 'vm.confirmPassword'], function() {
        if ($scope.form.signUpForm && $scope.form.signUpForm.password.$dirty && $scope.form.signUpForm.confirmPassword.$dirty) {
          if (vm.password !== vm.confirmPassword) {
            vm.pwdMatched = false;
          } else {
            vm.pwdMatched = true;
          }
        }
      });
    }
  }
})();
