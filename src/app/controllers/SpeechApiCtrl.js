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
        var currentStep = 0;

        $scope.steps = [
            {
                step: 'Step 1'
            },
            {
                step: 'Step 2'
            },
            {
                step: 'Step 3'
            }
        ]

        if('speechSynthesis' in window) {
            $scope.speechSupport = "Speech is supported!";
        } else {
            $scope.speechSupport = "Speech is not supported!";
        }

        if(currentStep === 0) {
            speech.sayText($scope.steps[0].step);
            $scope.step = $scope.steps[0].step;
        }

        $scope.$on('COMMAND', function (evt, msg) {
            if(currentStep >= $scope.steps.length && msg === 'next') {
                speech.sayText('No more steps');
                return;
            } else if (currentStep <= 0 && msg === 'back') {
                speech.sayText('Cannot go back. This is the first step');
                return;
            }

            switch(msg) {
                case 'next':
                    currentStep += 1;
                    break;

                case 'back':
                    currentStep -= 1;
                    break;

                case 'repeat':
                    break;

                case 'start over':
                    currentStep = 0;
                    break;

                default:
                    speech.sayText('Please repeat command');
                    return;
                    break;
            }

            speech.sayText($scope.steps[currentStep].step);
            if(currentStep + 1 === $scope.steps.length) {
                speech.sayText('This was the last step. Enjoy!')
            }
            $scope.step = $scope.steps[currentStep].step;
            $scope.$digest();
        });

        $scope.record = function () {
            speech.speak();
        }

        $scope.speak = function () {
            speech.sayText($scope.msg);
        }
    }

    return ['$scope', '$rootScope', 'speech', SpeechApiCtrl];

});
