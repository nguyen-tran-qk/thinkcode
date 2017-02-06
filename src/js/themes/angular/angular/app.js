(function() {
  'use strict';

  angular.module('app', [
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngAria',
    'ui.router',
    'ui.utils',
    'ui.jq',
    'ui.bootstrap',
    'ngMaterial',
    'angularBootstrapNavTree',
    'utils'
  ]).constant("$MD_THEME_CSS","default");

  var app = angular.module('app')
    .config(
      ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$interpolateProvider',
        '$mdThemingProvider',
        function($controllerProvider, $compileProvider, $filterProvider, $provide, $interpolateProvider,
          $mdThemingProvider) {
          app.controller = $controllerProvider.register;
          app.directive = $compileProvider.directive;
          app.filter = $filterProvider.register;
          app.factory = $provide.factory;
          app.service = $provide.service;
          app.constant = $provide.constant;
          app.value = $provide.value;

          // $mdThemingProvider.disableTheming();
          // $mdThemingProvider.theme('default').dark();
          $interpolateProvider.startSymbol('::');
          $interpolateProvider.endSymbol('::');

        }
      ]);

})();
