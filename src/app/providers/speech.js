'use strict';
define([], function () {
    /**
     * @type Factory
     * @module speechApi.factory
     * @class speech
     */

    function speech($rootScope) {
        //load recognition code
        var recognizing = false;
        var ignore_onend;
        var final_transcript = '';

        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = function() {

        };

        recognition.onerror = function (evt) {

        }

        recognition.onresult = function (evt) {
            var speechLength = evt.results.length;
            for (var i = evt.resultIndex; i < evt.results.length; i++) {
                var result = evt.results[i];
                if(result.isFinal) {
                    final_transcript += result[0].transcript;
                }
            }
            final_transcript = final_transcript.replace(' ', '');
            $rootScope.$broadcast('COMMAND', final_transcript);

            final_transcript = '';
        }

        function sayIt (text) {
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[0];
            msg.voiceURI = 'native';
            msg.volume = 1;
            msg.rate = 1;
            msg.pitch = 3;
            msg.text = text
            msg.lang = 'en-us';

            speechSynthesis.speak(msg);

        }

        return {
            sayText: sayIt,
            speak: function () {
                final_transcript = '';
                recognition.lang = 'en-US';
                recognition.start();
            }
        };
    }

    return ['$rootScope', speech];
});
