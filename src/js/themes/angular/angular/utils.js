(function() {
  'use strict';
  //// Initialize Firebase.
  //// TODO: replace with your Firebase project configuration.
  var config = {
    apiKey: "AIzaSyBudG45_yT09bxKTbipdm42tgqWD8SF9WM",
    authDomain: "thinkcode-37132.firebaseapp.com",
    databaseURL: "https://thinkcode-37132.firebaseio.com"
  };
  var firebaseApp = firebase.initializeApp(config);
  var firepadRefs = firebase.database().ref('firepadInstances');
  // firebase.database.enableLogging(true);
  angular.module('utils', [])
    .factory('Utils', [function() {
      return {
        firebaseApp: firebaseApp,
        firepadRefs: firepadRefs
      };
    }]);

  angular.module('app').filter('findBranchByUid', function() {
    return function(list, uid) {
      return list.filter(function(l) {
        if (uid === l.uid) {
          return true;
        }
      });
    };
  })
}());
