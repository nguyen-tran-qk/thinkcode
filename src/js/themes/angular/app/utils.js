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
    }])
    .filter('moment', function() {
      return function(string, format) {
        if (string && moment(string).isValid()) {
          return moment(string).format(format);
        } else {
          return string;
        }
      };
    })
    .filter('fromNow', function() {
      return function(string, notSuffixed) {
        if (moment(string).isValid()) {
          // if (isSuffixed === true) {
          //   return moment(string).fromNow(true);
          // } else {
          return moment(string).fromNow(notSuffixed);
          // }
        } else {
          return string;
        }
      };
    })
    .filter('courseStatus', function() {
      return function(string) {
        if (string === 'draft') {
          return 'Bản nháp';
        } else if (string === 'reviewing') {
          return 'Đang kiểm tra';
        } else if (string === 'published') {
          return 'Đã được duyệt';
        } else {
          return string;
        }
      };
    })
    .filter('badgeImage', function() {
      return function(badge_id, badge_arr) {
        var result = badge_arr.find(function(item) {
          return item.id === badge_id;
        });
        if (result) {
          return result.image;
        } else {
          return '';
        }
      }
    });

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
