define(["app/config"], function (appConfig) {
    /**
     * @module speechApi.controllers
     * @class speechApiCtrl
     * @constructor
     * @param $scope {Object} Angular Scope object tied to the speechApiCtrl Controller
     * @param $location {Object} Angular's version of window.location(parses url in address bar)
     */
    function SpeechApiCtrl ($scope, speech) {
        var spoken = false;

        $scope.appDisplayName = "Speech api";
        $scope.currentStep = 'test';

        if('speechSynthesis' in window) {
            $scope.speechSupport = "Speech is supported!";
        } else {
            $scope.speechSupport = "Speech is not supported!";
        }



        $scope.record = function () {
            speech.speak();
        }

        $scope.speak = function () {
            speech.sayText($scope.msg);
        }
    }

    return ['$scope', 'speech', SpeechApiCtrl];

});
