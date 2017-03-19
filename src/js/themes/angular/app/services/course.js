(function() {
  'use strict';

  angular.module('app')
    .factory('CoursesService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      return {
        tokenString: function() {
          return '?token=' + localStorage.token;
        },
        getAllCourses: function(type, callback, errorCallback) {
          var url = API_URL + '/courses';
          if (type === 'manage') {
            url += '/manage?token=' + localStorage.token;
          } else if (type === 'collaborate') {
            url += '/collaborate?token=' + localStorage.token;
          } else if (type === 'review') {
            url += '/review?token=' + localStorage.token;
          }
          $http.get(url)
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
        createCourse: function(course, callback, errorCallback) {
          var data = {
            token: localStorage.token,
            course: course
          };
          $http.post(API_URL + '/courses', data)
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
        updateCourse: function(courseId, course, callback, errorCallback) {
          var data = {
            token: localStorage.token,
            course: course
          };
          $http.put(API_URL + '/courses/' + courseId, data)
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
        getCourseById: function(courseId, callback, errorCallback) {
          $http.get(API_URL + '/courses/' + courseId + this.tokenString())
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
        deleteCourse: function(courseId, callback, errorCallback) {
          $http.delete(API_URL + '/courses/' + courseId + this.tokenString())
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
        changeCourseStatus: function(courseId, state, callback, errorCallback) {
          $http.patch(API_URL + '/courses/' + courseId + '/change_status?token=' + localStorage.token + '&state=' + state)
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
        searchBadge: function(keyword, callback, errorCallback) {
          $http.get(API_URL + '/badges?keyword=' + keyword)
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
