(function() {
  'use strict';

  angular.module('app')
    .factory('CoursesService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      return {
        getAllCourses: function(isInstructor, callback, errorCallback) {
          var url = API_URL + '/courses';
          if (isInstructor) {
            url += '/manage?token=' + localStorage.token;
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
        }
      };
    }]);
})();
