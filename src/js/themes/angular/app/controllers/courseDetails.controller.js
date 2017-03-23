(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('CourseDetailsCtrl', CourseDetailsCtrl);

  function CourseDetailsCtrl($scope, $rootScope, $state, $uibModal, $timeout, $filter, CoursesService, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading[0] = true;
    $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    var engine_arr = ['Engine', 'Python', 'Ruby'],
      level_arr = ['Level', 'Learn', 'Hack'];
    vm.$state = $state;
    if (!vm.$state.params.course_id) {
      vm.$state.go('main.courses', {}, { reload: true });
      return;
    }

    var isInstructor = function() {
      if ($scope.user.instructor) {
        return true;
      } else {
        $scope.showMessage('danger', 'Xin lỗi, bạn không có quyền thực hiện thao tác này.');
        return false;
      }
    };

    vm.getCourseDetails = function() {
      $scope.loading[0] = true;
      CoursesService.getCourseById(vm.$state.params.course_id, function(res) {
        vm.course = res.data;
        vm.course.engine_id = engine_arr.indexOf(vm.course.engine);
        vm.course.level_id = level_arr.indexOf(vm.course.level);
        $timeout(function() {
          $scope.loading[0] = false;
        }, 1000);
      }, function(res) {
        vm.$state.go('main.courses');
        if (res.status === 401) {
          $scope.showMessage('danger', 'Xin lỗi, bạn không có quyền thực hiện thao tác này.');
        } else {
          $scope.showMessage('danger');
        }
        $timeout(function() {
          $scope.loading[0] = false;
        });
      }, 1000);
    };

    vm.editCourse = function() {
      var editInfoAllowed = false;
      var editAdminAllowed = false;
      var check = $filter('existedInArray', { item: $scope.user, arr: vm.course.teachers });
      if (vm.course.status === 'draft') {
        editInfoAllowed = $scope.user.username === vm.course.admin || $filter('existedInArray')($scope.user, vm.course.teachers);
      } else if (vm.course.status === 'reviewing') {
        editInfoAllowed = $scope.user.staff;
      }
      editAdminAllowed = $scope.user.username === vm.course.admin || $scope.user.staff;
      $uibModal.open({
        templateUrl: 'courses/course-admin.html',
        backdrop: 'static',
        keyboard: false,
        controller: 'editCourseCtrl',
        controllerAs: 'vm',
        resolve: {
          courseData: {
            course: angular.copy(vm.course),
            editInfoAllowed: editInfoAllowed,
            editAdminAllowed: editAdminAllowed,
            scope: $scope
          }
        }
      }).result.then(function(newCourse) {
        var infoData = {
          cover: newCourse.cover,
          title: newCourse.title,
          description: newCourse.description,
          badge_id: newCourse.badge_id,
          engine_id: newCourse.engine_id,
          level_id: newCourse.level_id
        };
        CoursesService.updateCourse(vm.course.id, infoData, function(res) {
          var data = {
            author_id: newCourse.author_id,
            editor_ids: [],
            required_course_ids: []
          };
          for (var i = 0; i < newCourse.teachers.length; i++) {
            data.editor_ids.push(newCourse.teachers[i].id);
          }
          for (var j = 0; j < newCourse.prerequisites.length; j++) {
            data.required_course_ids.push(newCourse.prerequisites[j].id);
          }
          CoursesService.updateCourseAdministration(vm.course.id, data, function(res) {
            $scope.showMessage('success', 'Khóa học cập nhật thành công!');
            vm.getCourseDetails();
          }, function(res) {
            $scope.showMessage('danger');
          });
        }, function(res) {
          $scope.showMessage('danger');
        });
      }, function() {
        vm.getCourseDetails();
      });
    };

    vm.changeCourseStatus = function(status) {
      CoursesService.changeCourseStatus(vm.course.id, status, function(res) {
        var msg;
        if (status === 'reviewing') {
          msg = 'Khóa học được chuyển sang trạng thái: Chờ kiểm tra.';
        } else if (status === 'draft') {
          msg = 'Khóa học đã được đưa về bản nháp.';
        } else if (status === 'published') {
          msg = 'Khóa học đã được duyệt thành công.';
        }
        vm.$state.reload();
        $scope.showMessage('success', msg);
      }, function(res) {
        if (res.status === 401) {
          $scope.showMessage('danger', 'Xin lỗi, bạn không có quyền thực hiện thao tác này!');
        } else {
          $scope.showMessage('danger');
        }
      });
    };

    vm.deleteCourse = function(courseId, title) {
      if (isInstructor) {
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
              vm.$state.go('main.courses', { type: vm.$state.params.type }, { reload: true });
            }, function(res) {
              if (res.status === 500) {
                $scope.showMessage('danger', 'Xin lỗi, thao tác thất bại!');
              } else if (res.status === 401) {
                $scope.showMessage('danger', 'Xin lỗi, bạn không có quyền thực hiện thao tác này!');
              } else {
                $scope.showMessage('danger');
              }
            });
          }
        });
      }
    };

    vm.getCourseDetails();
  }
})();
