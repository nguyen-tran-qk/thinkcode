(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('WorkspacesController', workspacesCtrl);

  function workspacesCtrl($scope, $rootScope, $state, $uibModal, UserService, WorkspaceService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;

    WorkspaceService.getAllWorkspaces(function(res) {
      $scope.loading = false;
      vm.workspaces = res.data.workspaces;
    }, function(res) {
      $scope.showMessage('danger');
    });

    vm.createWorkspace = function() {
      $uibModal.open({
        templateUrl: 'modals/create-workspace.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance) {
          var vm = this;
          vm.content = 'Vui lòng chọn engine cho workspace:';
          vm.engine = {
            id: -1,
            name: 'Chọn engine'
          };
          vm.selectEngine = function(engine_id) {
            vm.engine.id = engine_id;
            if (engine_id === 1) {
              vm.engine.name = 'Python';
            } else {
              vm.engine.name = 'Ruby';
            }
          };
          vm.ok = function() {
            $uibModalInstance.close(vm.engine.id);
          };
          vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        controllerAs: 'vm'
      }).result.then(function(engine_id) {
        WorkspaceService.createWorkspace(engine_id, function(res) { //will change dynamically later
          $scope.showMessage('success', 'Workspace created!');
          vm.$state.go('main.workspaces.details', { workspaceId: res.data.new_workspace_id });
        }, function(res) {
          if (res.status === 500) {
            $scope.showMessage('danger', 'Xin lỗi, không thể tạo workspace!');
          } else {
            var msg;
            for (var i = res.data.length - 1; i >= 0; i--) {
              msg = res.data[i].error;
              $scope.showMessage('danger', msg);
            }
          }
        });
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
