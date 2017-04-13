(function() {
  'use strict';

  angular.module('app')
    .factory('LearnerService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      return {
        tokenString: function() {
          return '?token=' + localStorage.token;
        },
        getLearningCourses: function() {
          return $http.get(API_URL + '/progresses/learner' + this.tokenString());
        },
        getProjects: function(finished) {
          var url = API_URL + '/workspaces' + this.tokenString();
          if (finished !== 'all') {
            url += '&finished=' + finished;
          }
          return $http.get(url);
        }
      };
    }]);
}());
