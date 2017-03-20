(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('CourseDetailsCtrl', CourseDetailsCtrl);

  function CourseDetailsCtrl($scope, $rootScope, $state, $uibModal, $timeout, CoursesService, UserService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
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
      CoursesService.getCourseById(vm.$state.params.course_id, function(res) {
        vm.course = res.data;
        vm.course.engine_id = engine_arr.indexOf(vm.course.engine);
        vm.course.level_id = level_arr.indexOf(vm.course.level);
        $timeout(function() {
          $scope.loading = false;
        }, 1000);
      }, function(res) {
        vm.$state.go('main.courses');
        if (res.status === 401) {
          $scope.showMessage('danger', 'Xin lỗi, bạn không có quyền thực hiện thao tác này.');
        } else {
          $scope.showMessage('danger');
        }
        $timeout(function() {
          $scope.loading = false;
        });
      }, 1000);
    };
    vm.getCourseDetails();

    vm.updateCourse = function() {
      if (isInstructor) {
        if (vm.course.status === 'published') {
          $scope.showMessage('danger', 'Cannot update published course!');
          return;
        }
        $uibModal.open({
          templateUrl: 'modals/create-course.html',
          backdrop: 'static',
          keyboard: false,
          controller: function($timeout, $uibModalInstance, course, CoursesService, BadgeService) {
            var vm = this;
            var engine_arr = ['Engine', 'Python', 'Ruby'],
              level_arr = ['Level', 'Learn', 'Hack'];

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

            vm.course = course;
            vm.course.badge_id = course.badge.id;
            BadgeService.getBadges(function(res) {
              vm.currentBadge = res.data.find(function(badge) {
                return badge.id === vm.course.badge.id;
              });
            });
            vm.selectEngine = function(engine_id) {
              vm.course.engine_id = engine_id;
              vm.course.engine = engine_arr[engine_id];
            };
            vm.selectLevel = function(level_id) {
              vm.course.level_id = level_id;
              vm.course.level = level_arr[level_id];
            };
            vm.validForm = function() {
              return vm.course.title && vm.course.description && vm.course.engine_id && vm.course.level_id && vm.course.cover && vm.course.badge_id;
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
            course: angular.copy(vm.course)
          }
        }).result.then(function(newCouse) {
          var data = {
            cover: newCouse.cover,
            title: newCouse.title,
            description: newCouse.description,
            badge_id: newCouse.badge_id,
            engine_id: newCouse.engine_id,
            level_id: newCouse.level_id
          };
          CoursesService.updateCourse(vm.course.id, data, function(res) {
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
      }
    };

    vm.courseAdministration = function() {
      $uibModal.open({
        templateUrl: 'courses/course-admin.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($timeout, $uibModalInstance, UserService, CoursesService, course) {
          var vm = this;
          vm.course = course;
          UserService.searchUser(vm.course.admin, function(res) {
            vm.course.author_id = res.data[0].id;
          }, function(res) {
            $uibModalInstance.dismiss();
            $scope.showMessage('danger');
          });
          vm.authorList = [];
          vm.authorTyping = false;
          vm.aKeyword = '';
          vm.editorList = [];
          vm.editorTyping = false;
          vm.eKeyword = '';
          vm.courseList = [];
          vm.courseTyping = false;
          vm.cKeyword = '';

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

          function existedInArray(item, arr) {
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].id === item.id) {
                return true;
              }
            }
            return false;
          }
          vm.ok = function() {
            $uibModalInstance.close(vm.course);
          };
          vm.cancel = function() {
            $uibModalInstance.dismiss();
          };
          vm.delaySearch = debounce(function(type, keyword) {
            if (keyword && keyword.length) {
              if (type === 'author' || type === 'editor') {
                UserService.searchUser(keyword, function(res) {
                  if (type === 'author') {
                    vm.authorList = res.data;
                  } else {
                    vm.editorList = res.data;
                  }
                }, function(res) {
                  $scope.showMessage('danger');
                });
              } else if (type === 'course') {
                CoursesService.searchCourse(keyword, function(res) {
                  vm.courseList = res.data;
                }, function(res) {
                  $scope.showMessage('danger');
                });
              }
            } else {
              return;
            }
          }, 300);
          vm.select = function(type, item) {
            if (type === 'author') {
              vm.authorTyping = false;
              vm.aKeyword = '';
              vm.authorList = [];
              vm.course.author_id = item.id;
              vm.course.admin = item.username;
            } else if (type === 'editor') {
              vm.editorTyping = false;
              vm.eKeyword = '';
              vm.editorList = [];
              if (!existedInArray(item, vm.course.teachers)) {
                vm.course.teachers.push(item);
              }
            } else if (type === 'course') {
              vm.courseTyping = false;
              vm.cKeyword = '';
              vm.courseList = [];
              if (!existedInArray(item, vm.course.prerequisites)) {
                vm.course.prerequisites.push(item);
              }
            } else {
              return;
            }
          };
          vm.remove = function(type, item) {
            if (type === 'editor') {
              vm.course.teachers = vm.course.teachers.filter(function(teacher) {
                return teacher.id !== item.id;
              });
            } else if (type === 'course') {
            	vm.course.prerequisites = vm.course.prerequisites.filter(function(course) {
                return course.id !== item.id;
              });
            }
          };
        },
        controllerAs: 'vm',
        resolve: {
          course: angular.copy(vm.course)
        }
      }).result.then(function(course) {
        var data = {
          author_id: course.author_id,
          editor_ids: [],
          required_course_ids: []
        };
        for (var i = 0; i < course.teachers.length; i++) {
          data.editor_ids.push(course.teachers[i].id);
        }
        for (var j = 0; j < course.prerequisites.length; j++) {
          data.required_course_ids.push(course.prerequisites[j].id);
        }
        CoursesService.updateCourseAdministration(vm.course.id, data, function(res) {
          $scope.showMessage('success', 'Khóa học cập nhật thành công!');
          vm.getCourseDetails();
        }, function(res) {
          $scope.showMessage('danger');
        });
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
  }
})();
