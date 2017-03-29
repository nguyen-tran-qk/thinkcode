(function () {
    "use strict";

    angular.module('app')
        .directive('nestable', function ($parse) {
            return {
                restrict: 'C',
                link: function (scope, el, attrs) {
                    var expressionHandler = $parse(attrs.onDrop);
                    el.tkNestable();
                    el.on('change', function() {
                        expressionHandler(scope);
                    });
                }
            };
        });

})();