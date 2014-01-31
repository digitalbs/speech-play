define(["app/config"], function (appConfig) {
    /**
     * @module speechApi.controllers
     * @class speechApiCtrl
     * @constructor
     * @param $scope {Object} Angular Scope object tied to the speechApiCtrl Controller
     * @param $location {Object} Angular's version of window.location(parses url in address bar)
     */
    function SpeechApiCtrl ($scope, $rootScope, speech) {
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



        $scope.$on('Speech_Result', function (evt, result) {

            if(spoken) {
                if(result === 'next') {
                    speech.sayText('next step');
                } else if (result === 'repeat') {
                    speech.sayText('repeating step');
                } else if (result === 'start over') {
                    speech.sayText('starting over');
                } else if (result === 'back') {
                    speech.sayText('going back one step');
                }
            }


        });

    }

    return ['$scope', '$rootScope', 'speech', SpeechApiCtrl];

});
