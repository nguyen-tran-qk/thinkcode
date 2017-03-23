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
        },
        getBadgeById: function(id, callback, errorCallback) {
          $http.get(API_URL + '/badges/' + id)
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
        createBadge: function(data, callback, errorCallback) {
          $http.post(API_URL + '/badges', { token: localStorage.token, badge: data })
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
        manageBadge: function(id, data, callback, errorCallback) {
          var promise;
          if (data) {
            promise = $http.put(API_URL + '/badges/' + id, { token: localStorage.token, badge: data });
          } else {
            promise = $http.delete(API_URL + '/badges/' + id + '?token=' + localStorage.token);
          }
          promise.then(function(res) {
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
