// Usamos aqui a localização de módulo, mas poderiamos passar o módulo a uma referência
// var ui = angular.module("ui", []);

angular.module("ui", []);

angular.module("ui").run(function ($templateCache) {
    $templateCache.put("view/accordion.html",
        '<div class="card">\n' +
        '    <div class="card-header" ng-click="open()">\n' +
        '        <h2 class="mb-0">\n' +
        '            {{title}}\n' +
        '        </h2>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="card-body" ng-show="isOpened" ng-transclude></div>\n' +
        '</div>'
    );
});

angular.module("ui").directive("uiAccordions", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            var accordions = [];

            this.registerAccordion = function (accordion) {
                accordions.push(accordion);
            };

            this.closeAll = function () {
                accordions.forEach((accordion) => {
                    accordion.isOpened = false;
                })
            };
        }
    }
});

angular.module("ui").directive("uiAccordion", function () {
    return {
        templateUrl: "view/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: "^uiAccordions",
        link: function (scope, element, attrs, ctrl) {
            ctrl.registerAccordion(scope);
            scope.open = function () {
                ctrl.closeAll();
                scope.isOpened = true;
            }
        }
    }
});
