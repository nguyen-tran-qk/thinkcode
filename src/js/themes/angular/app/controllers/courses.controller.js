(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('CoursesCtrl', CoursesCtrl);

  function CoursesCtrl($scope, $rootScope, $state, $uibModal, CoursesService, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    // $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;

    vm.fetchCourses = function() {
      $scope.loading[0] = true;
      var type = vm.$state.params.type || 'published';
      CoursesService.getAllCourses(type, function(res) {
        vm.courses = res.data;
        if (vm.$state.params.type === 'review') {
          CoursesService.getAllCourses('published', function(res) {
            vm.publishedCourses = res.data;
            $scope.loading[0] = false;
          });
        } else {
          $scope.loading[0] = false;
        }
      }, function(res) {
        $scope.loading[0] = false;
        if (res.status !== 401) {
          $scope.showMessage('danger');
        }
      });
    };
    vm.fetchCourses();

    vm.openCourseModal = function(courseId) {
      $uibModal.open({
        templateUrl: 'modals/create-course.html',
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        controller: function($timeout, $uibModalInstance, courseId, CoursesService, BadgeService) {
          var vm = this;
          var engine_arr = ['Ngôn ngữ', 'Python', 'Ruby', 'Java'],
            level_arr = ['Độ khó', 'Mới học', 'Căn bản', 'Nâng cao'];

          function debounce(func, wait, context) {
            var timer;
            return function debounced() {
              var context = $scope,
                args = Array.prototype.slice.call(arguments);
              $timeout.cancel(timer);
              timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
              }, wait || 10);
            };
          }

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
          vm.searchBadge = debounce(function(keyword) {
            if (keyword && keyword.length) {
              BadgeService.searchBadge(keyword, function(res) {
                vm.badgeList = res.data;
              });
            } else {
              vm.badgeList = [];
            }
          }, 300);
          vm.selectBadge = function(badge) {
            vm.typing = false;
            vm.course.badge_id = badge.id;
            vm.currentBadge = badge;
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
                      vm.course.cover = e.target.result; // Retrieve the image. 
                    });
                  };
                });
              }
            }
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
            vm.$state.go('main.courses.details', { course_id: res.data.new_course_id });
          } else {
            $scope.showMessage('danger');
          }
        }, function(res) {
          if (res.data.length > 0) {
            angular.forEach(res.data, function(obj) {
              $scope.showMessage('danger', obj.error);
            });
          } else {
            $scope.showMessage('danger');
          }
        });
      }, function(result) {
        if (result !== 'close') {
          $scope.showMessage('danger');
        }
      });
    };

    $scope.$watch('vm.$state.params.type', function(newVal, oldVal) {
      if (newVal !== oldVal && vm.$state.params.type) {
        vm.fetchCourses();
      }
    });
  }
})();
