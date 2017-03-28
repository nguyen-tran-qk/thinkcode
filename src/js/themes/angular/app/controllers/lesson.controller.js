(function() {
  'use strict';

  angular.module('thinkcodeControllers')
    .controller('LessonController', lessonCtrl);

  function lessonCtrl($scope, $rootScope, $state, UserService) {
    $scope.app.settings.htmlClass = 'transition-navbar-scroll top-navbar-hide';
    $scope.app.settings.bodyClass = '';
    document.getElementById("main").style.overflow = 'auto';
    var $navbar = $('.navbar');
    if ($navbar.hasClass('navbar-size-large')) {
      $navbar.removeClass('navbar-size-large');
    }
    if ($navbar.hasClass('navbar-size-xlarge')) {
      $navbar.removeClass('navbar-size-xlarge');
    }
    if ($navbar.hasClass('paper-shadow')) {
      $navbar.removeClass('paper-shadow');
    }
    if (!$navbar.hasClass('auto-hide')) {
      $navbar.addClass('auto-hide');
    }
    $('.navbar .navbar-right .navbar-btn').addClass('btn-sm');
    $('.navbar .container').addClass('width-100pc');

    $scope.loading[0] = false;

    $scope.user = UserService.getUser();

    var vm = this;
    vm.$state = $state;
    vm.minimized = false;
    vm.lesson = {
    	order: 1
    };
  }
}());
