(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('CoursesCtrl', CoursesCtrl);

  function CoursesCtrl($scope, $rootScope, $state, $uibModal, CoursesService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;

    vm.fetchCourses = function() {
      CoursesService.getAllCourses(vm.$state.is('main.courses.manage'), function(res) {
        vm.courses = res.data;
        $scope.loading = false;
      }, function(res) {
        $scope.showMessage('danger');
      });
    };
    vm.fetchCourses();

    vm.openCourseModal = function(courseId) {
      $uibModal.open({
        templateUrl: 'modals/create-course.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance, courseId, CoursesService) {
          var vm = this;
          var engine_arr = ['Engine', 'Python', 'Ruby'],
            level_arr = ['Level', 'Learn', 'Hack'];
          vm.course = {
            engine: engine_arr[0],
            level: level_arr[0]
          };
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
          vm.changeCourseStatus = function() {
            var status = vm.course.status === 'draft' ? 'published' : 'draft';
            CoursesService.changeCourseStatus(vm.course.id, status, function(res) {
            	$uibModalInstance.dismiss('close');
              $scope.showMessage('success', 'Cập nhật khóa học thành công!');
              vm.fetchCourses();
            }, function(res) {
              $uibModalInstance.dismiss();
            });
          };

          if (courseId > -1) {
            CoursesService.getCourseById(courseId, function(res) {
              vm.course = res.data;
              vm.course.engine_id = engine_arr.indexOf(vm.course.engine);
              vm.course.level_id = level_arr.indexOf(vm.course.level);
            }, function(res) {
              $uibModalInstance.dismiss();
            });
          }
        },
        controllerAs: 'vm',
        resolve: {
          courseId: courseId || -1
        }
      }).result.then(function(newCouse) {
        if (courseId > -1) {
          CoursesService.updateCourse(courseId, newCouse, function(res) {
            $scope.showMessage('success', 'Chỉnh sửa khóa học thành công!');
            vm.fetchCourses();
          }, function(res) {
            $scope.showMessage('danger');
          });
        } else {
          CoursesService.createCourse(newCouse, function(res) {
            if (res.data.new_course_id) {
              $scope.showMessage('success', 'Tạo khóa học thành công!');
              vm.fetchCourses();
            } else {
              $scope.showMessage('danger');
            }
          }, function(res) {
            $scope.showMessage('danger');
          });
        }
      }, function(result) {
        if (result !== 'close') {
          $scope.showMessage('danger');
        }
      });
    };

    vm.deleteCourse = function(courseId, title) {
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
