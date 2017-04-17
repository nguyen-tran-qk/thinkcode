(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('MainController', mainCtrl);

  function mainCtrl($scope, $state, $interval, $q, $timeout, UserService, BadgeService, ngToast, $firebaseObject, $firebaseArray) {
    $scope.loading = [true];
    $scope.$state = $state;
    $scope.userCheck = undefined;
    $scope.user = UserService.getUser();

    $.fn.redraw = function() {
      return $(this).each(function() {
        var redraw = this.offsetHeight;
      });
    };

    function checkConversation(item) {
      if (item.messages) {
        item.unread = false;
        var mKeys = Object.keys(item.messages);
        for (var i = 0; i < mKeys.length; i++) {
          if (checkUnreadMsg(item.messages[mKeys[i]])) {
            $scope.unreadCount++;
            item.unread = true;
            break;
          }
        }
      }
      // if ($scope.user.isLearner) {
      //   UserService.getUserInfo(item.teacher_id, 'info')
      //     .then(function(res) {
      //       item.chatterName = res.data.username;
      //     });
      // } else if ($scope.user.instructor) {
      //   UserService.getUserInfo(item.student_id, 'info')
      //     .then(function(res) {
      //       item.chatterName = res.data.username;
      //     });
      // }
      return item;
    }

    function compareConvo(convoA, convoB) {
      if (convoA.unread) {
        if (!convoB.unread) {
          return -1;
        } else {
          if (moment(convoA.updated).isAfter(convoB.updated)) {
            return -1;
          } else {
            return 1;
          }
        }
      } else {
        if (convoB.unread) {
          return 1;
        } else {
          if (moment(convoA.updated).isAfter(convoB.updated)) {
            return -1;
          } else {
            return 1;
          }
        }
      }
    }

    function checkUnreadMsg(msg) {
      if (msg.user_id !== $scope.user.id.toString()) {
        if (!msg.read) {
          return true;
        }
      }
      return false;
    }

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

    function checkUser() {
      if (localStorage.token) {
        UserService.checkUser()
          .then(function(res) {}, function(res) {
            if (res.status === 400) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              $scope.$state.go('main.courses', { type: 'published' }, { reload: true });
              $scope.unsetUserCheck();
              ngToast.create({
                className: 'danger',
                content: 'Bạn đã bị đăng xuất khỏi hệ thống. Vui lòng đăng nhập lại.',
                timeout: '5000'
              });
            }
          });
      }
    }

    $scope.setUserCheck = function() {
      if (!angular.isDefined($scope.userCheck)) {
        $scope.userCheck = $interval(function() {
          checkUser();
        }, 15000);
      }
    };
    $scope.unsetUserCheck = function() {
      if (angular.isDefined($scope.userCheck)) {
        $interval.cancel($scope.userCheck);
        $scope.userCheck = undefined;
      }
    };

    $scope.getConvos = debounce(function() {
      $scope.conversations = [];
      $scope.unreadCount = 0;
      $scope.conversations = $firebaseArray(firebase.database().ref().child('chat/'));
      $scope.conversations.$loaded().then(function() {
        for (var i = 0; i < $scope.conversations.length; i++) {
          if ($scope.conversations[i].student_id == $scope.user.id || $scope.conversations[i].teacher_id == $scope.user.id) {
            $scope.conversations[i] = checkConversation($scope.conversations[i]);
            $scope.conversations[i].isInvolved = true;
          }
        }
        $scope.conversations.sort(compareConvo);
        $scope.conversations.$watch(function(obj) {
          var index = $scope.conversations.$indexFor(obj.key);
          if (obj.event === 'child_added') {
            if ($scope.conversations[index] &&
              ($scope.conversations[index].student_id == $scope.user.id || $scope.conversations[index].teacher_id == $scope.user.id)) {
              $scope.conversations[index] = checkConversation($scope.conversations[index]);
              $scope.conversations[index].isInvolved = true;
            }
          } else if (obj.event === 'child_changed') {
            $('#main-nav').redraw();
            $scope.getConvos();
            // console.log(obj);
          }
        });
        $scope.loading[0] = false;
      });
    }, 2000);

    $scope.allBadges = [];

    BadgeService.getBadges(function(res) {
      $scope.allBadges = res.data;
    }, function(res) {
      $scope.allBadges = [];
    });

    $scope.signout = function() {
      $scope.loading[0] = true;
      UserService.signout(function(res) {
        $scope.loading[0] = false;
        $scope.unsetUserCheck();
        $scope.user = null;
        $scope.$state.go('main.courses', { type: 'published' }, { reload: true });
      });
    };
    $scope.showMessage = function(type, msg) {
      var message = msg || 'Xin lỗi, thao tác thất bại.';
      ngToast.create({
        className: type,
        content: message,
        timeout: '5000'
      });
    };
    $scope.goTo = function(state, params) {
      if (!params) {
        params = {};
      }
      $state.go(state, params, { reload: true });
    };
    $scope.transitionTo = function(state, params) {
      if (!params) {
        params = {};
      }
      $state.transitionTo(state, params, { notify: false });
    };
    if (localStorage.token) {
      checkUser();
      $scope.getConvos();
      $scope.setUserCheck();
    } else {
      $scope.unsetUserCheck();
    }
    $scope.$on("$destroy", function() {
      $scope.unsetUserCheck();
    });
  }
}());
