(function() {
  'use strict';

  angular.module('app', [
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngAria',
    'ui.router',
    'ui.router.middleware',
    'ui.utils',
    'ui.jq',
    'ui.bootstrap',
    'ngMaterial',
    'angularBootstrapNavTree',
    'ngFileUpload',
    'angularResizable',
    'utils',
    'thinkcodeControllers'
  ]).constant("$MD_THEME_CSS", "default");

  angular.module('thinkcodeControllers', []);

  var app = angular.module('app')
    // .factory('httpRequestInterceptor', function() {
    //   return {
    //     request: function(config) {
    //       config.headers['Origin'] = '*';
    //       return config;
    //     }
    //   };
    // })
    .run(['$http', function($http) {
      $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    }])
    .config(
      ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$interpolateProvider',
        '$mdThemingProvider', '$httpProvider',
        function($controllerProvider, $compileProvider, $filterProvider, $provide, $interpolateProvider,
          $mdThemingProvider, $httpProvider) {
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

          // $httpProvider.interceptors.push('httpRequestInterceptor');
        }
      ]);

})();
