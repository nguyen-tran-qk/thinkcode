(function() {
  "use strict";

  angular.module('app')
    .directive('mdBox', function(ivhTreeviewMgr) {
      return {
        restrict: 'AE',
        template: [
          '<span class="ascii-box">',
          '<span ng-show="node.selected" class="x"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="true"></md-checkbox></span>',
          '<span ng-show="node.__ivhTreeviewIndeterminate" class="y"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="false"></md-checkbox></span>',
          '<span ng-hide="node.selected || node.__ivhTreeviewIndeterminate"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="false"></md-checkbox></span>',
          '</span>',
        ].join(''),
        link: function(scope, element, attrs) {
          element.on('click', function() {
            scope.trvw.toggleSelected(scope.node);
          });
        }
      };
    });

})();
