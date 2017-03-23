(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('editCourseCtrl', editCourseCtrl);

  function editCourseCtrl($scope, $timeout, $uibModalInstance, UserService, CoursesService, BadgeService, courseData) {
    var vm = this;
    vm.course = courseData.course;
    vm.editInfoAllowed = courseData.editInfoAllowed;
    vm.editAdminAllowed = courseData.editAdminAllowed;
    if (!vm.editInfoAllowed) {
      $scope.tab = 2;
    } else {
      $scope.tab = 1;
    }
    var engine_arr = ['Engine', 'Python', 'Ruby'],
      level_arr = ['Level', 'Learn', 'Hack'];
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
    vm.course.badge_id = courseData.course.badge.id;
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
      return $scope.form.newCourseForm.$valid && vm.course.engine_id && vm.course.level_id && vm.course.badge_id && vm.course.author_id;
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
    vm.ok = function() {
      $uibModalInstance.close(vm.course);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss();
    };
    vm.delaySearch = debounce(function(type, keyword) {
      // if (keyword && keyword.length) {
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
      // } else {
      //   return;
      // }
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

    vm.addLesson = function() {
      CoursesService.addLessonToCourse(vm.course.id, vm.selectedLesson, function(res) {
        CoursesService.getCourseById(vm.course.id, function(res) {
          vm.course = res.data;
          vm.editing = false;
        }, function(res) {
          $scope.showMessage('danger');
        });
      }, function(res) {
        $scope.showMessage('danger');
      });
    };

    vm.deleteLesson = function(lesson) {
      if (!lesson.deleteConfirm) {
      	lesson.deleteConfirm = true;
      } else {
        CoursesService.deleteLesson(vm.course.id, lesson.id, function(res) {
          CoursesService.getCourseById(vm.course.id, function(res) {
            vm.course = res.data;
          }, function(res) {
            $scope.showMessage('danger');
          });
        }, function(res) {
          $scope.showMessage('danger');
        });
      }
    };
  }
})();
