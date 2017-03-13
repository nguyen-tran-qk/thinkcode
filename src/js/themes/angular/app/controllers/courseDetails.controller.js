(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('CourseDetailsCtrl', CourseDetailsCtrl);

  function CourseDetailsCtrl($scope, $rootScope, $state, $uibModal, CoursesService, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
    $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    var engine_arr = ['Engine', 'Python', 'Ruby'],
      level_arr = ['Level', 'Learn', 'Hack'];
    vm.$state = $state;
    if (!vm.$state.params.course_id || !$scope.user.instructor) {
      vm.$state.go('main.manage-courses', {}, { reload: true });
      return;
    }

    vm.getCourseDetails = function() {
      CoursesService.getCourseById(vm.$state.params.course_id, function(res) {
        vm.course = res.data;
        vm.course.engine_id = engine_arr.indexOf(vm.course.engine);
        vm.course.level_id = level_arr.indexOf(vm.course.level);
      }, function(res) {
        vm.$state.go('main.manage-courses');
        $scope.showMessage('danger');
      });
    };
    vm.getCourseDetails();

    vm.updateCourse = function() {
    	if (vm.course.status === 'published') {
    		$scope.showMessage('danger', 'Cannot update published course!');
    		return;
    	}
      $uibModal.open({
        templateUrl: 'modals/create-course.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance, course, CoursesService) {
          var vm = this;
          var engine_arr = ['Engine', 'Python', 'Ruby'],
            level_arr = ['Level', 'Learn', 'Hack'];
          vm.course = course;
          vm.selectEngine = function(engine_id) {
            vm.course.engine_id = engine_id;
            vm.course.engine = engine_arr[engine_id];
          };
          vm.selectLevel = function(level_id) {
            vm.course.level_id = level_id;
            vm.course.level = level_arr[level_id];
          };
          vm.validForm = function() {
            return vm.course.title && vm.course.description && vm.course.engine_id && vm.course.level_id;
          };
          vm.ok = function() {
            $uibModalInstance.close(vm.course);
          };
          vm.cancel = function() {
            $uibModalInstance.dismiss('close');
          };
        },
        controllerAs: 'vm',
        resolve: {
          course: angular.copy(vm.course)
        }
      }).result.then(function(newCouse) {
        CoursesService.updateCourse(vm.course.id, newCouse, function(res) {
        	$scope.showMessage('success', 'Khóa học cập nhật thành công!');
          vm.getCourseDetails();
        }, function(res) {
          $scope.showMessage('danger');
        });
      }, function(result) {
        if (result !== 'close') {
          $scope.showMessage('danger');
        }
      });
    };

    vm.changeCourseStatus = function() {
      var status = vm.course.status === 'draft' ? 'published' : 'draft';
      CoursesService.changeCourseStatus(vm.course.id, status, function(res) {
        vm.$state.reload();
      }, function(res) {
        $scope.showMessage('danger');
      });
    };

    vm.deleteCourse = function(courseId, title) {
    	if (vm.course.status === 'published') {
    		$scope.showMessage('danger', 'Cannot delete published course!');
    		return;
    	}
      $uibModal.open({
        templateUrl: 'modals/delete-confirm.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance, data) {
          var vm = this;
          vm.content = 'Bạn xác nhận muốn xóa khóa học: ' + data.title + '?';
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
            id: courseId,
            title: title
          }
        }
      }).result.then(function(result) {
        if (result === 'ok') {
          CoursesService.deleteCourse(courseId, function(res) { //will change dynamically later
            $scope.showMessage('success', 'Khóa học đã xóa thành công!');
            vm.$state.go('main.manage-courses', {}, { reload: true });
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
