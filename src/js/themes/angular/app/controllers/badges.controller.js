(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('BadgesController', BadgesController);

  function BadgesController($scope, $rootScope, $state, $timeout, $filter, $uibModal, BadgeService, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
    $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;

    $timeout(function() {
      if (vm.$state.params.id) {
        vm.selectBadge(parseInt(vm.$state.params.id));
      }
    });

    vm.fetchBadges = function() {
      BadgeService.getBadges(function(res) {
        vm.badges = res.data;
        $scope.loading = false;
      }, function(res) {
        $scope.showMessage('danger');
      });
    };
    vm.fetchBadges();

    vm.selectBadge = function(id) {
      BadgeService.getBadgeById(id, function(res) {
        vm.selectedBadge = res.data;
        vm.editing = false;
      }, function(res) {
        if (res.status === 404) {
          $scope.showMessage('danger', 'Xin lỗi, danh hiệu bạn tìm kiếm không tồn tại.');
        } else {
          $scope.showMessage('danger');
        }
      });
    };

    vm.newBadge = function() {
      vm.selectedBadge = {};
      vm.editing = true;
    };

    vm.save = function() {
      $scope.loading = true;
      if (vm.selectedBadge.id) {
        BadgeService.manageBadge(vm.selectedBadge.id, vm.selectedBadge, function(res) {
          vm.selectBadge(vm.selectedBadge.id);
          vm.fetchBadges();
        }, function(res) {
          $scope.loading = false;
          if (res.data.length) {
            angular.forEach(res.data, function(err) {
              $scope.showMessage('danger', err.error);
            });
          } else {
            $scope.showMessage('danger');
          }
        });
      } else {
        BadgeService.createBadge(vm.selectedBadge, function(res) {
          vm.selectBadge(res.data.new_badge_id);
          vm.fetchBadges();
        }, function(res) {
          $scope.loading = false;
          if (res.data.length) {
            angular.forEach(res.data, function(err) {
              $scope.showMessage('danger', err.error);
            });
          } else {
            $scope.showMessage('danger');
          }
        });
      }
      vm.editing = false;
    };

    vm.delete = function() {
      $uibModal.open({
        templateUrl: 'modals/delete-confirm.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance, data) {
          var vm = this;
          vm.content = 'Bạn xác nhận muốn xóa danh hiệu: ' + data.title + '?';
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
            title: vm.selectedBadge.title
          }
        }
      }).result.then(function(result) {
        if (result === 'ok') {
          $scope.loading = true;
          BadgeService.manageBadge(vm.selectedBadge.id, null, function(res) {
            vm.editing = false;
            vm.selectedBadge = null;
            vm.fetchBadges();
          }, function(res) {
            $scope.loading = false;
            if (res.data.length) {
              angular.forEach(res.data, function(err) {
                $scope.showMessage('danger', err.error);
              });
            } else {
              $scope.showMessage('danger');
            }
          });
        }
      });
    };

    // Read the image using the filereader 
    var fileReaderSupported = window.FileReader !== null;
    vm.photoChanged = function(file) {
      if (file !== null) {
        // var file = files[0];
        if (fileReaderSupported && file.type.indexOf('image') > -1) {
          $timeout(function() {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file); // convert the image to data url. 
            fileReader.onload = function(e) {
              $timeout(function() {
                vm.selectedBadge.image = e.target.result; // Retrieve the image. 
              });
            };
          });
        }
      }
    };
  }
})();
