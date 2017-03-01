(function() {
  'use strict';

  angular.module('app')
    // .constant('API_URL', 'http://ec2-35-165-39-222.us-west-2.compute.amazonaws.com/api/v1')
    .constant('API_URL', 'https://www.thinkcode.ml/api/v1')
    .factory('UserService', ['API_URL', '$http', function(API_URL, $http) {
      var user = null;
      return {
        setUser: function(value) {
          user = value;
        },
        isLoggedIn: function() {
          return (localStorage.jwt) ? true : false;
        },
        signin: function(auth, callback, errorCallback) {
          $http.post(API_URL + '/signin', auth)
            .then(function(res) {
              if (res.data && res.data.jwt) {
                localStorage.jwt = res.data.jwt;
              }
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        signout: function(callback, errorCallback) {
          $http.delete(API_URL + '/signout', { 'token': localStorage.jwt })
            .then(function(res) {
              localStorage.removeItem('jwt');
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
