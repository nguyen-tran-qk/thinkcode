(function() {
  'use strict';

  angular.module('app')
    .factory('CoursesService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      return {
        getAllPublishedCourses: function(callback, errorCallback) {
          $http.get(API_URL + '/courses')
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
