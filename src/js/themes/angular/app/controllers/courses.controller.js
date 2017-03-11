(function() {
	'use strict';
	angular.module('thinkcodeControllers')
    .controller('CoursesCtrl', CoursesCtrl);

  function CoursesCtrl($scope, $rootScope, $state, CoursesService) {
  	$scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;
    $('.main-container').tkScrollNavbarTransition();

  	var vm = this;
  	vm.$state = $state;

  	vm.fetchPublishedCourses = function() {
  		CoursesService.getAllPublishedCourses(function(res) {
  			vm.courses = res.data;
  			$scope.loading = false;
  		}, function(res) {
  			$scope.showMessage('danger');
  		});
  	};
  	vm.fetchPublishedCourses();
  }
})();