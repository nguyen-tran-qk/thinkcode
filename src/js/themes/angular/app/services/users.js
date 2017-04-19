(function() {
  'use strict';

  angular.module('app')
    .factory('UserService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      var user = null;
      return {
        getUser: function() {
          return localStorage.user ? JSON.parse(localStorage.user) : null;
        },
        setUser: function(value) {
          user = value;
        },
        isLoggedIn: function() {
          return (localStorage.token) ? true : false;
        },
        signin: function(auth, callback, errorCallback) {
          $http.post(API_URL + '/signin', auth)
            .then(function(res) {
              if (res.data && res.data.session) {
                if (!res.data.session.admin && !res.data.session.instructor && !res.data.session.staff) {
                  res.data.session['isLearner'] = true;
                }
                localStorage.token = res.data.session.token;
                localStorage.user = JSON.stringify(res.data.session);
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
        signup: function(data, callback, errorCallback) {
          $http.post(API_URL + '/signup', data)
            .then(function(res) {
              if (res.data && res.data.session) {
                localStorage.token = res.data.session.token;
                localStorage.user = JSON.stringify(res.data.session);
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
          $http.delete(API_URL + '/signout?token=' + localStorage.token)
            .then(function(res) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        searchUser: function(keyword, role, callback, errorCallback) {
          $http.get(API_URL + '/users/search?keyword=' + keyword + '&role=' + role)
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
        checkUser: function() {
          return $http.get(API_URL + '/expire_check?token=' + localStorage.token);
        },
        getUserInfo: function(userId, type) {
          return $http.get(API_URL + '/users/' + userId + '?type=' + type);
        },
        updateUserInfo: function(userId, type, userData) {
          var data = {
            token: localStorage.token,
            type: type,
            user: userData
          };
          if (type === 'profile') {
            return Upload.upload({
              url: API_URL + '/users/' + userId,
              method: 'PUT',
              data: data
            });
          } else {
            return $http.put(API_URL + '/users/' + userId, data);
          }
        },
        getUserConversations: function() {
          return $http.get(API_URL + '/workspaces/conversations?token=' + localStorage.token);
        }
      };
    }]);
})();
