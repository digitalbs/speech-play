define([
    "app/config",
    "app/templates",
    "app/controllers",
    "app/filters",
    "app/directives",
    "app/providers"
], function (config, templates) {
    /**
     * speechApi Module
     * @module speechApi
     */
    angular.module("speechApi", [
            "ngRoute",
            "ui.bootstrap",
            "ngAnimate",
            "speechApi.controllers",
            "speechApi.filters",
            "speechApi.directives",
            "speechApi.providers"
        ])
    
    /**
     * Sets up Angular Application settings (Routing, etc...)
     * @class config
     * @constructor
     * @param $routeProvider {Object} Angular provider that allows us to configure routes in the application
     * @param $locationProvider {Object} Angular provider that configures how the applications deep links paths are stored
     */
        .config(["$routeProvider", "$locationProvider",
            function ($routeProvider, $locationProvider) {

                $routeProvider.when("/", {
                    templateUrl: 'app/views/default.html',
                    controller: 'SpeechApiCtrl'
                });

                $routeProvider.otherwise({
                    templateUrl: 'app/views/404.html',
                    controller: 'SpeechApiCtrl'
                });

                $locationProvider.html5Mode(config.html5Routing);
            }
        ])
        .constant('navigation', config.navigation)
        
        .run(['$templateCache', templates]);
});
