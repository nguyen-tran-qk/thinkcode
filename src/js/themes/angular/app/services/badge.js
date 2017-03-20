(function() {
  'use strict';

  angular.module('app')
    .factory('BadgeService', ['API_URL', '$http', function(API_URL, $http) {
      return {
        searchBadge: function(keyword, callback, errorCallback) {
          $http.get(API_URL + '/badges/search?keyword=' + keyword)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        getBadges: function(callback, errorCallback) {
          $http.get(API_URL + '/badges')
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        }
      };
    }]);
})();
