(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('CourseDetailsCtrl', CourseDetailsCtrl);

  function CourseDetailsCtrl($scope, $rootScope, $state, $uibModal, $timeout, $filter, CoursesService, UserService, BadgeService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading[0] = true;
    // $scope.user = UserService.getUser();
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
        if (vm.course.enrolled && vm.course.lessons.length) {
          vm.lastLesson = vm.course.lessons[0];
          for (var i = 0; i < vm.course.lessons.length; i++) {
            if (vm.course.lessons[i].progress === 'current') {
              vm.lastLesson = vm.course.lessons[i];
              break;
            }
          }
        }
        vm.tempCourse = res.data;
        if (vm.isConfig) {
          onInitConfig();
        }
        $timeout(function() {
          $scope.loading[0] = false;
        }, 1000);
      }, function(res) {
        vm.$state.go('main.courses', { type: 'published' }, { reload: true });
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

    vm.enroll = function() {
      if (!$scope.user) {
        vm.$state.go('login');
        return;
      }
      var promise = CoursesService.enrollCourse(vm.course.id);
      promise.then(function(res) {
        if (res.status < 300) {
          CoursesService.startLesson(vm.course.id, vm.course.lessons[0].id)
            .then(function(res) {
              if (!$scope.conversations.$getRecord(res.data.workspace_id)) {
                var data = {
                  workspace_id: res.data.workspace_id,
                  student_id: res.data.student_id,
                  student_name: $scope.user.username, // only learner can call this function in this controller -> safe to get user's username
                  teacher_id: res.data.teacher_id,
                  teacher_name: lesson.teacher.username,
                  course_id: vm.course.id,
                  lesson_title: vm.course.lessons[0].title,
                  updated: (new Date()).toString()
                }
                CoursesService.registerConversation(data);
              }
              vm.$state.go('main.learn', { course_id: vm.course.id, workspace_id: res.data.workspace_id });
            }, function(res) {
              $scope.showMessage('danger');
            });
        }
      }, function(res) {
        $scope.showMessage('danger');
      });
    };

    vm.unenroll = function() {
      $uibModal.open({
        templateUrl: 'modals/confirm.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance, data) {
          var vm = this;
          vm.title = 'Hủy đăng ký';
          vm.content = 'Mọi tiến trình học liên quan đến khóa học này, ngoại trừ các danh hiệu, sẽ bị mất. Bạn chắc chắn muốn hủy đăng ký "' + data.title + '"?';
          vm.ok = function() {
            $uibModalInstance.close('ok');
          };
          vm.cancel = function() {
            $uibModalInstance.dismiss();
          };
        },
        controllerAs: 'vm',
        resolve: {
          data: {
            title: vm.course.title
          }
        }
      }).result.then(function(result) {
        if (result === 'ok') {
          CoursesService.enrollCourse(vm.course.id, true)
            .then(function(res) {
              vm.getCourseDetails();
            }, function(res) {
              $scope.showMessage('danger');
            });
        }
      });
    };

    vm.goToLesson = function(lesson) {
      CoursesService.startLesson(vm.course.id, lesson.id)
        .then(function(res) {
          if (!$scope.conversations.$getRecord(res.data.workspace_id)) {
            var data = {
              workspace_id: res.data.workspace_id,
              student_id: res.data.student_id,
              student_name: $scope.user.username, // only learner can call this function in this controller -> safe to get user's username
              teacher_id: res.data.teacher_id,
              teacher_name: lesson.teacher.username,
              course_id: vm.course.id,
              lesson_title: lesson.title,
              updated: (new Date()).toString()
            }
            CoursesService.registerConversation(data);
          }
          vm.$state.go('main.learn', { course_id: vm.course.id, workspace_id: res.data.workspace_id });
        }, function(res) {
          $scope.showMessage('danger');
        });
    };

    vm.getCourseDetails();

    /* edit course's details and configurations */

    vm.editCourse = function() {
      vm.isConfig = true;
      if (vm.course.status === 'draft') {
        vm.editInfoAllowed = $scope.user.username === vm.course.admin || $filter('existedInArray')($scope.user, vm.course.teachers);
      } else if (vm.course.status === 'reviewing') {
        vm.editInfoAllowed = $scope.user.staff;
      }
      if (!vm.editInfoAllowed) {
        $scope.tab = 2;
      } else {
        $scope.tab = 1;
      }
      vm.editAdminAllowed = $scope.user.username === vm.course.admin.username || $scope.user.staff;
      vm.tempCourse = angular.copy(vm.course);
    };

    vm.saveEdit = function(newCourse) {
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
    };

    var onInitConfig = function() {
      var engine_arr = ['Engine', 'Python', 'Ruby'],
        level_arr = ['Level', 'Learn', 'Hack'];
      UserService.searchUser(vm.tempCourse.admin.username, 'instructor', function(res) {
        vm.tempCourse.author_id = res.data[0].id;
      }, function(res) {
        $uibModalInstance.dismiss();
        scope.showMessage('danger');
      });
      $scope.form = {};
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
      vm.tempCourse.badge_id = vm.tempCourse.badge.id;
      BadgeService.getBadges(function(res) {
        vm.currentBadge = res.data.find(function(badge) {
          return badge.id === vm.tempCourse.badge.id;
        });
      });
      vm.selectEngine = function(engine_id) {
        vm.tempCourse.engine_id = engine_id;
        vm.tempCourse.engine = engine_arr[engine_id];
      };
      vm.selectLevel = function(level_id) {
        vm.tempCourse.level_id = level_id;
        vm.tempCourse.level = level_arr[level_id];
      };
      vm.validForm = function() {
        return vm.tempCourse.engine_id && vm.tempCourse.level_id && vm.tempCourse.badge_id && vm.tempCourse.author_id;
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
        vm.tempCourse.badge_id = badge.id;
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
                  vm.tempCourse.cover = e.target.result; // Retrieve the image. 
                });
              };
            });
          }
        }
      };

      vm.delaySearch = debounce(function(type, keyword) {
        // if (keyword && keyword.length) {
        if (type === 'author' || type === 'editor') {
          UserService.searchUser(keyword, 'instructor', function(res) {
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
          vm.tempCourse.author_id = item.id;
          vm.tempCourse.admin = item.username;
        } else if (type === 'editor') {
          vm.editorTyping = false;
          vm.eKeyword = '';
          vm.editorList = [];
          if (!existedInArray(item, vm.tempCourse.teachers)) {
            vm.tempCourse.teachers.push(item);
          }
        } else if (type === 'course') {
          vm.courseTyping = false;
          vm.cKeyword = '';
          vm.courseList = [];
          if (!existedInArray(item, vm.tempCourse.prerequisites)) {
            vm.tempCourse.prerequisites.push(item);
          }
        } else {
          return;
        }
      };
      vm.remove = function(type, item) {
        if (type === 'editor') {
          vm.tempCourse.teachers = vm.tempCourse.teachers.filter(function(teacher) {
            return teacher.id !== item.id;
          });
        } else if (type === 'course') {
          vm.tempCourse.prerequisites = vm.tempCourse.prerequisites.filter(function(course) {
            return course.id !== item.id;
          });
        }
      };

      vm.addLesson = function() {
        var lessonId = vm.selectedLesson.id || null;
        var data = {
          lesson: {
            title: vm.selectedLesson.title,
            description: vm.selectedLesson.description
          },
          type: vm.selectedLesson.type
        };
        if (vm.selectedLesson.type === 'video' || vm.selectedLesson.type === 'reading') {
          if (vm.selectedLesson.type === 'video') {
            data.video_task = {
              video_url: vm.selectedLesson.video_url,
              video_duration: vm.selectedLesson.video_duration,
              teacher_note: vm.selectedLesson.teacher_note
            };
          } else {
            data.reading_task = {
              content: vm.selectedLesson.content
            };
          }
          CoursesService.addOrUpdateLesson(vm.tempCourse.id, lessonId, data, function(res) {
            CoursesService.getCourseById(vm.tempCourse.id, function(res) {
              vm.tempCourse = res.data;
              vm.editing = false;
              vm.selectedLesson = {};
            }, function(res) {
              $scope.showMessage('danger');
            });
          }, function(res) {
            $scope.showMessage('danger');
          });
        } else {
          if (vm.selectedLesson.type === 'code') {
            data.code_task = {
              template: vm.selectedLesson.template,
              cheat_sheet: vm.selectedLesson.cheat_sheet
            };
          } else {
            data.project_task = {
              template: vm.selectedLesson.template
            };
          }
          vm.uploading = '1%';
          CoursesService.uploadCodeLesson(vm.tempCourse.id, lessonId, data, function(res) {
            if (res.status < 300) {
              CoursesService.getCourseById(vm.tempCourse.id, function(res) {
                vm.tempCourse = res.data;
                vm.editing = false;
                vm.uploading = null;
                vm.selectedLesson = {};
              }, function(res) {
                $scope.showMessage('danger');
              });
            }
          }, function(res) {
            if (res.data.length) {
              angular.forEach(res.data, function(err) {
                $scope.showMessage('danger', err.error);
              });
            } else {
              $scope.showMessage('danger');
            }
          }, function(percentage) {
            $timeout(function() {
              vm.uploading = percentage + '%';
            }, 100);
          });
        }
      };

      vm.deleteLesson = function(lesson) {
        if (!lesson.deleteConfirm) {
          lesson.deleteConfirm = true;
        } else {
          CoursesService.deleteLesson(vm.tempCourse.id, lesson.id, function(res) {
            CoursesService.getCourseById(vm.tempCourse.id, function(res) {
              vm.tempCourse = res.data;
            }, function(res) {
              $scope.showMessage('danger');
            });
          }, function(res) {
            $scope.showMessage('danger');
          });
        }
      };

      vm.saveLessonsOrder = debounce(function() {
        var items = document.getElementsByClassName('nestable-item'),
          orderedList = [];
        for (var i = 0; i < items.length; i++) {
          orderedList.push($(items[i]).data('lesson-id'));
        }
        CoursesService.updateLessonsOrder(vm.tempCourse.id, orderedList, function(res) {
          vm.orderChanged = false;
          $scope.showMessage('success', 'Thứ tự bài học đã được cập nhật thành công!');
        }, function(res) {
          $scope.showMessage('danger');
        });
      }, 2000);

      vm.selectLesson = function(item) {
        vm.uploading = null;
        CoursesService.getLessonById(vm.tempCourse.id, item.id, function(res) {
          vm.editing = true;
          vm.selectedLesson = res.data;
          if (vm.selectedLesson.type === 'code' || vm.selectedLesson.type === 'project') {
            vm.selectedLesson.template = '';
          }
        }, function(res) {
          $scope.showMessage('danger');
        });
      };

      vm.downloadTemplate = function(lessonId) {
        CoursesService.downloadLessonTemplate(vm.tempCourse.id, lessonId, function(res) {
          window.open(res);
        }, function(res) {
          $scope.showMessage('danger');
        });
      };
      vm.validLesson = function() {
        if (!vm.selectedLesson || !vm.selectedLesson.title || !vm.selectedLesson.description) {
          return false;
        } else {
          if (vm.selectedLesson.type === 'video') {
            return vm.selectedLesson.video_url && vm.selectedLesson.video_duration && vm.selectedLesson.teacher_note;
          }
          if (vm.selectedLesson.type === 'reading') {
            return vm.selectedLesson.content;
          }
          if (vm.selectedLesson.type === 'code') {
            return vm.selectedLesson.id || (vm.selectedLesson.template && vm.selectedLesson.cheat_sheet);
          }
          if (vm.selectedLesson.type === 'project') {
            return vm.selectedLesson.id || vm.selectedLesson.template;
          }
        }
      };
    };

    $scope.$watch('vm.isConfig', function() {
      if (vm.isConfig) {
        onInitConfig();
      }
    });
  }
})();
