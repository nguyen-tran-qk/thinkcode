(function() {
  "use strict";

  angular.module('app')
    .directive('chatBox', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {
      return {
        restrict: 'E',
        templateUrl: 'modals/chat-box.html',
        scope: {
          user: '=user',
          workspaceId: '=workspaceId',
          teacher: '=teacher',
          callback: '&callback'
        },
        controller: ['$scope', '$interval', 'UserService', function($scope, $interval, UserService) {
          /* behavior handler */
          $('#live-chat header').on('click', function() {
            $('.chat').slideToggle(300, 'swing');
            $('.chat-message-counter').fadeToggle(300, 'swing');
          });

          $('.chat-close').on('click', function(e) {
            e.preventDefault();
            $('#live-chat').fadeOut(300);
          });
          /* end behavior handler */
          var firebaseRef = firebase.database().ref();
          var conversation = firebase.database().ref('chat/' + $scope.workspaceId);
          // $scope.conversation = $firebaseObject(firebaseRef.child('chat/' + $scope.workspaceId));
          $scope.$watch('workspaceId', function() {
            if ($('.chat').css('display') == 'block') {
              $('.chat').slideToggle(300, 'swing');
            }
            $scope.conversation = $firebaseObject(firebaseRef.child('chat/' + $scope.workspaceId));
            $scope.conversation.$loaded().then(function() {
              $scope.ownAvatar = $scope.user.avatar.preview;
              if ($scope.user.isLearner) {
                $scope.chatterName = $scope.conversation.teacher_name;
                UserService.getUserInfo($scope.conversation.teacher_id, 'info')
                  .then(function(res) {
                    if (res.data.avatar.preview.length) {
                      $scope.chatterAvatar = res.data.avatar.preview;
                    } else {
                      $scope.chatterAvatar = 'https://api.adorable.io/avatars/40/' + $scope.conversation.teacher_name + '.png';
                    }
                  });
              } else {
                $scope.chatterName = $scope.conversation.student_name;
                UserService.getUserInfo($scope.conversation.student_id, 'info')
                  .then(function(res) {
                    if (res.data.avatar.preview.length) {
                      $scope.chatterAvatar = res.data.avatar.preview;
                    } else {
                      $scope.chatterAvatar = 'https://api.adorable.io/avatars/40/' + $scope.conversation.student_name + '.png';
                    }
                  });
              }
            });
            var ref = firebaseRef.child('chat/' + $scope.workspaceId + '/messages');
            var check;
            $scope.active = false;
            $scope.messages = $firebaseArray(ref);
            $scope.messages.$loaded()
              .then(function() {
                $scope.toggleChatBox();
                $scope.messages.$watch(function(obj) {
                  if (obj.event === 'child_added') {
                    var newMsg = $scope.messages.$getRecord(obj.key);
                    if (newMsg && newMsg.user_id !== $scope.user.id.toString()) {
                      if ($scope.active) {
                        newMsg.read = true;
                        $scope.messages.$save(newMsg);
                        $scope.unreadCount = 0;
                      } else {
                        $scope.unreadCount++;
                      }
                    }
                    // var convoObj = firebase.database().ref('chat/' + $scope.workspaceId);
                    // convoObj.update({ updated: (new Date()).toString() });
                  }
                  $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
                });
              })
              .catch(function(error) {
                console.log("Firebase load error:", error);
              });
          });

          function checkReadMsg(msg) {
            if (msg.user_id !== $scope.user.id.toString() && !msg.read) {
              if ($scope.active) {
                msg.read = true;
                $scope.messages.$save(msg);
                $scope.unreadCount = 0;
              } else {
                $scope.unreadCount++;
              }
            }
            $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
          }
          $scope.toggleChatBox = function() {
            $scope.unreadCount = 0;
            document.getElementById('chat-field').focus();
            for (var i = 0; i < $scope.messages.length; i++) {
              checkReadMsg($scope.messages[i]);
            }
          };
          $scope.sendChat = function() {
            var datetime = new Date();
            var chatMessage = {
              user_id: $scope.user.id.toString(),
              name: $scope.user.username,
              message: $scope.chatMes.trim(),
              datetime: datetime.toString(),
              read: false
            };
            $scope.messages.$add(chatMessage);
            $scope.chatMes = "";
            conversation.update({ updated: (new Date()).toString() });
          };
          $scope.checkSubmit = function(event) {
            var element = typeof event === 'object' ? event.target : document.getElementById(event);
            var scrollHeight = element.scrollHeight - 16; // replace 16 by the sum of padding-top and padding-bottom
            element.style.height = scrollHeight + "px";

            var code = event.keyCode || event.which;
            if (code === 13) {
              if (!event.shiftKey) {
                event.preventDefault();
                $scope.sendChat();
                element.style.height = '35px';
              }
            }
          };
          $scope.$on('$destroy', function() {
            $scope.conversation = undefined;
            $scope.messages = undefined;
          });
        }]
      };
    }])
    .directive('scrollBottom', function() {
      return {
        scope: {
          scrollBottom: "="
        },
        link: function(scope, element) {
          scope.$watchCollection('scrollBottom', function(newValue) {
            if (newValue) {
              $(element).scrollTop($(element)[0].scrollHeight);
            }
          });
        }
      };
    });
})();
