(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('UserProfilesCtrl', userProfilesCtrl);

  function userProfilesCtrl($scope, $rootScope, $state, $q, $timeout, UserService, LearnerService, InstructorService) {
    $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading[0] = true;
    $scope.form = {};
    // $scope.user = UserService.getUser();
    $('.main-container').tkScrollNavbarTransition();

    var vm = this;
    vm.$state = $state;
    vm.getLearningCourses = function(callback) {
      LearnerService.getLearningCourses()
        .then(function(res) {
          vm.learningCourses = res.data;
          if (callback) {
            callback();
          }
        }, function(res) {
          $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getCompletedCourses = function() {
      UserService.getUserInfo($scope.user.id, 'completions')
        .then(function(res) {
          $scope.loading[0] = false;
          vm.completedCourses = res.data.completions;
        }, function(res) {
          // $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getTeachingCourses = function(callback) {
      InstructorService.getTeachingCourses()
        .then(function(res) {
          vm.teachingCourses = res.data;
          if (callback) {
            callback();
          }
        }, function(res) {
          // $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getMyProjects = function(finished, callback) {
      LearnerService.getProjects(finished)
        .then(function(res) {
          vm.myProjects = res.data.workspaces;
          $scope.loading[0] = false;
          if (callback) {
            callback();
          }
        }, function(res) {
          // $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.getMyBadges = function(callback) {
      UserService.getUserInfo($scope.user.id, 'achievements')
        .then(function(res) {
          vm.myBadges = res.data.achievements;
          if (callback) {
            callback();
          } else {
            $scope.loading[0] = false;
          }
        }, function(res) {
          // $scope.loading[0] = false;
          $scope.showMessage('danger');
        });
    };

    vm.fetchData = function() {
      vm.getLearningCourses(function() {
        vm.getMyProjects(false, function() {
          vm.getMyBadges(function() {
            if ($scope.user.instructor) {
              vm.getTeachingCourses(function() {
                $timeout(function() {
                  $rootScope.$broadcast('masonry.reload');
                  $scope.loading[0] = false;
                }, 100);
              });
            } else {
              $timeout(function() {
                $rootScope.$broadcast('masonry.reload');
                $scope.loading[0] = false;
              }, 100);
            }
          });
        });
      });
    };

    vm.getProfiles = function(isUpdated) {
      $scope.loading[0] = true;
      UserService.getUserInfo($scope.user.id, 'info')
        .then(function(res) {
          vm.profiles = res.data;
          if (isUpdated) {
            var temp = JSON.parse(localStorage.user);
            temp.avatar = res.data.avatar;
            localStorage.user = JSON.stringify(temp);
            $scope.user = UserService.getUser();
          }
          vm.profileData = {
            avatar: null
          };
          $scope.loading[0] = false;
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
                vm.profiles.avatar.preview = e.target.result; // Retrieve the image. 
                vm.profileData.avatar = e.target.result;
              });
            };
          });
        }
      }
    };

    vm.saveProfiles = function() {
      vm.saving = true;
      vm.profileData.email = vm.profiles.email;
      vm.profileData.introduction = vm.profiles.introduction;
      UserService.updateUserInfo($scope.user.id, 'profile', vm.profileData)
        .then(function(res) {
          vm.getProfiles(true);
          $scope.showMessage('success', 'Cập nhật thông tin thành công!');
          vm.saving = false;
        }, function(res) {
          $scope.showMessage('danger');
        });
    };

    vm.changePassword = function() {
      vm.saving = true;
      UserService.updateUserInfo($scope.user.id, 'password', vm.pwdData)
        .then(function(res) {
          vm.getProfiles(true);
          $scope.form.pwdForm.$setPristine();
          $scope.form.pwdForm.$setUntouched();
          vm.pwdData = {};
          vm.confirmPwd = undefined;
          $scope.showMessage('success', 'Đổi mật khẩu thành công!');
          vm.saving = false;
        }, function(res) {
          vm.saving = false;
          if (res.data.message === 'Wrong old password.') {
            $scope.showMessage('danger', 'Mật khẩu hiện tại không chính xác.');
          } else {
            $scope.showMessage('danger');
          }
        });
    };

    $scope.$watch('vm.$state.params.page', function(newVal, oldVal) {
      if (vm.$state.params.page === 'dashboard') {
        vm.fetchData();
      }
      if (vm.$state.params.page === 'my-courses') {
        if ($scope.user.isLearner) {
          vm.getLearningCourses(function() {
            vm.getCompletedCourses();
          });
        } else {
          $scope.transitionTo('main.user', { page: 'dashboard' });
        }
      }
      if (vm.$state.params.page === 'my-projects') {
        if ($scope.user.isLearner) {
          vm.getMyProjects('all');
        } else {
          $scope.transitionTo('main.user', { page: 'my-courses' });
        }
      }
      if (vm.$state.params.page === 'profiles') {
        vm.getProfiles();
      }
      if (vm.$state.params.page === 'conversations') {
        $scope.loading[0] = true;
        $scope.getConvos();
      }
    });
  }
}());
