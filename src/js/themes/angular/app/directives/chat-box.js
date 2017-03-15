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
        controller: ['$scope', function($scope) {
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
          $scope.messages = $firebaseArray(ref);
          $scope.sendChat = function() {
            var currentdate = new Date();
            var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            var chatMessage = { user_id: $scope.user.id, name: $scope.user.username, message: $scope.chatMes, datetime: datetime };
            $scope.messages.$add(chatMessage);
            $scope.chatMes = "";
          }
        }]
      };
    }]);
})();
