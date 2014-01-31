define([], function () {

    angular.element(document).ready(function () {
        require([
            'app/app'
        ], function () {
            angular.bootstrap(document, ['speechApi']);
        });

    });


});
