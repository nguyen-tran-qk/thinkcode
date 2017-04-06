(function() {
  'use strict';
  angular.module('thinkcodeControllers')
    .controller('MainController', mainCtrl);

  function mainCtrl($scope, $state, $interval, $q, UserService, BadgeService, ngToast, $firebaseObject, $firebaseArray) {
    $scope.loading = [true];
    $scope.$state = $state;
    $scope.userCheck = undefined;
    $scope.convoCheck = undefined;
    $scope.user = UserService.getUser();
    $scope.setUserCheck = function() {
      if (!angular.isDefined($scope.userCheck)) {
        $scope.userCheck = $interval(function() {
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
        }, 15000);
      }
      if (!angular.isDefined($scope.convoCheck)) {
        $scope.convoCheck = $interval(function() {
          if (localStorage.token) {
            $scope.getConvos();
          }
        }, 30000);
      }
    };
    $scope.unsetUserCheck = function() {
      if (angular.isDefined($scope.userCheck)) {
        $interval.cancel($scope.userCheck);
        $scope.userCheck = undefined;
      }
      if (angular.isDefined($scope.convoCheck)) {
        $interval.cancel($scope.convoCheck);
        $scope.convoCheck = undefined;
      }
    };


    function checkUnreadMsg(msg) {
      if (msg.user_id !== $scope.user.id.toString() && !msg.read) {
        $scope.unreadCount++;
        return true;
      }
    }

    $scope.getConvos = function() {
      var promises = [];
      UserService.getUserConversations()
        .then(function(res) {
          $scope.user.conversations = [];
          $scope.unreadCount = 0;
          var convo_arr = res.data.conversation_ids;
          var index = 0;

          function next() {
            if (index < convo_arr.length) {
              var convo = $firebaseObject(firebase.database().ref().child('chat/' + convo_arr[index++]));
              convo.$loaded().then(function() {
                if (convo.messages) {
                  var mKeys = Object.keys(convo.messages);
                  for (var i = 0; i < mKeys.length; i++) {
                    if (checkUnreadMsg(convo.messages[mKeys[i]])) {
                      convo.unread = true;
                      break;
                    }
                  }
                }
                if (convo.student_id) {
                  if ($scope.user.isLearner) {
                    UserService.getUserInfo(convo.teacher_id, 'info')
                      .then(function(res) {
                        convo.chatterName = res.data.username;
                      });
                  } else if ($scope.user.instructor) {
                    UserService.getUserInfo(convo.student_id, 'info')
                      .then(function(res) {
                        convo.chatterName = res.data.username;
                      });
                  }
                }
                $scope.user.conversations.push(convo);
                next();
              });
            }
          }
          next();
        }, function(res) {
          $scope.showMessage('danger');
        });
    };

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
