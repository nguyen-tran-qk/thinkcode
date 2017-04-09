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
              if ($scope.user.isLearner) {
                $scope.chatterName = $scope.conversation.teacher_name;
              } else {
                $scope.chatterName = $scope.conversation.student_name;
              }
              // $scope.conversation.$watch(function(obj) {
              //   if (obj.event === 'value') {
              //     $scope.conversation.updated = (new Date()).toString();
              //     $scope.conversation.$save();
              //   }
              // });
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
            for (var i = 0; i < $scope.messages.length; i++) {
              checkReadMsg($scope.messages[i]);
            }
          };
          $scope.sendChat = function() {
            var datetime = new Date();
            var chatMessage = {
              user_id: $scope.user.id.toString(),
              name: $scope.user.username,
              message: $scope.chatMes,
              datetime: datetime.toString(),
              read: false
            };
            $scope.messages.$add(chatMessage);
            $scope.chatMes = "";
            conversation.update({ updated: (new Date()).toString() });
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
