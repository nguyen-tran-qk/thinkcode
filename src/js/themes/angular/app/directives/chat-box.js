(function() {
  "use strict";

  angular.module('app')
    .directive('chatBox', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {
      return {
        restrict: 'E',
        templateUrl: 'modals/chat-box.html',
        scope: {
          user: '=user'
        },
        controller: ['$scope', '$interval', function($scope, $interval) {
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

          var ref = firebase.database().ref().child('chat/conversation_1');
          var check;
          $scope.messages = $firebaseArray(ref);
          $scope.active = false;
          $scope.unreadCount = 0;

          function checkReadMsg(msg) {
            if (msg.user_id !== $scope.user.id && !msg.read) {
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
            for (var i = 0; i < $scope.messages.length; i++) {
              checkReadMsg($scope.messages[i]);
            }
          };
          $scope.toggleChatBox();
          ref.on('child_added', function(childSnapshot, prevChildKey) {
            var newMsg = childSnapshot.val();
            checkReadMsg(newMsg);
          });
          $scope.sendChat = function() {
            // var currentdate = new Date();
            // var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            var datetime = new Date();

            var chatMessage = { user_id: $scope.user.id, name: $scope.user.username, message: $scope.chatMes, datetime: datetime.toString(), read: false };
            $scope.messages.$add(chatMessage);
            $scope.chatMes = "";
          };
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
      }
    });
})();
