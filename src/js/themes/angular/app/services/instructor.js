(function() {
  'use strict';

  angular.module('app')
    .factory('InstructorService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      return {
        tokenString: function() {
          return '?token=' + localStorage.token;
        },
        getTeachingCourses: function() {
          return $http.get(API_URL + '/progresses/courses' + this.tokenString());
        },
        getCourseProgresses: function(courseId) {
          return $http.get(API_URL + '/courses/' + courseId + '/progresses' + this.tokenString());
        }
      };
    }]);
}());
