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
      	getProjects: function() {
      		return $http.get(API_URL + '/workspaces' + this.tokenString());
      	}
      };
    }]);
}());
