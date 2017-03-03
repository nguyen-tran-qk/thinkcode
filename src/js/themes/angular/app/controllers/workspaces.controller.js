(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('WorkspacesController', workspacesCtrl);

  function workspacesCtrl($scope, $rootScope, $state, $uibModal, UserService, WorkspaceService) {
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
          $scope.showMessage('danger', 'Xin lỗi, không thể tạo workspace!');
        } else {
          for (var i = res.data.length - 1; i >= 0; i--) {
            msg = res.data[i].error;
            $scope.showMessage('danger', msg);
          }
        }
      });
    };
    vm.deleteWorkspace = function(id, name) {
      $uibModal.open({
        templateUrl: 'modals/delete-confirm.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance, data) {
          var vm = this;
          vm.content = 'Bạn xác nhận muốn xóa workspace: ' + data.name + '?';
          vm.ok = function() {
            $uibModalInstance.close('ok');
          };
          vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        controllerAs: 'vm',
        resolve: {
          data: {
            id: id,
            name: name
          }
        }
      }).result.then(function(result) {
        if (result === 'ok') {
          WorkspaceService.deleteWorkspace(id, function(res) { //will change dynamically later
            $scope.showMessage('success', 'Workspace đã xóa thành công!');
            vm.$state.reload();
          }, function(res) {
            if (res.status === 500) {
              $scope.showMessage('danger', 'Xin lỗi, thao tác thất bại!');
            } else if (res.status === 401) {
              $scope.showMessage('danger', 'Xin lỗi, bạn không có quyền thực hiện thao tác này!');
            }
          });
        }
      });
    };
  }
})();
