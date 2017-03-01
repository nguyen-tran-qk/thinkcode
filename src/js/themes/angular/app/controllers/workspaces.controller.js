(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('WorkspacesController', workspacesCtrl);

  function workspacesCtrl($scope, $rootScope, $state, UserService, WorkspaceService) {
    $scope.user = UserService.getUser();
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;

    var vm = this;
    vm.$state = $state;

    WorkspaceService.getAllWorkspaces(function(res) {
      $scope.loading = false;
      vm.workspaces = res.data.workspaces;
    }, function(res) {
      $scope.showMessage();
    });

    vm.createWorkspace = function() {
      WorkspaceService.createWorkspace(2, function(res) { //will change dynamically later
        $scope.showMessage('success', 'Workspace created!');
      }, function(res) {
        if (res.status === 500) {
          $scope.showMessage('danger', 'Cannot create workspace!');
        } else {
          for (var i = res.data.length - 1; i >= 0; i--) {
            msg = res.data[i].error;
            $scope.showMessage('danger', msg);
          }
        }
      });
    };
    vm.deleteWorkspace = function(id) {
      WorkspaceService.deleteWorkspace(id, function(res) { //will change dynamically later
        $scope.showMessage('success', 'Workspace removed successfully!');
      }, function(res) {
        if (res.status === 500) {
          $scope.showMessage('danger', 'Workspace removed failed!');
        }
      });
    };
  }
})();
