(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('CoursesCtrl', CoursesCtrl);

  function CoursesCtrl($scope, $rootScope, $state, $uibModal, CoursesService, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
    $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;

    vm.fetchCourses = function() {
      CoursesService.getAllCourses(vm.$state.includes('main.manage-courses'), function(res) {
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
        },
        controllerAs: 'vm',
        resolve: {
          courseId: courseId || -1
        }
      }).result.then(function(newCouse) {
        CoursesService.createCourse(newCouse, function(res) {
          if (res.data.new_course_id) {
            $scope.showMessage('success', 'Tạo khóa học thành công!');
            vm.fetchCourses();
            vm.$state.go('main.manage-courses.details', {course_id: res.data.new_course_id});
          } else {
            $scope.showMessage('danger');
          }
        }, function(res) {
          $scope.showMessage('danger');
        });
      }, function(result) {
        if (result === 'updated') {
          $scope.showMessage('success', 'Cập nhật khóa học thành công!');
          vm.fetchCourses();
        } else if (result !== 'close') {
          $scope.showMessage('danger');
        }
      });
    };

  }
})();
