'use strict';
define([], function () {
    /**
     * @type Factory
     * @module speechApi.factory
     * @class speech
     */

    function speech() {
        var name = 'speech';
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
            sayIt(final_transcript);
            final_transcript = '';
        }

        function sayIt(text) {
            text = text.replace(' ', '');
            recognizing = true;
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[3];
            //msg.voiceURI = 'native';
            msg.volume = 1;
            msg.rate = 1;
            msg.pitch = 5;
            msg.text = command(text);
            msg.lang = 'en-us';


            if(recognizing) {
                speechSynthesis.speak(msg);
                recognizing = false;
            }
        }

        function command(result) {
            var command = '';
            switch(result) {
                case 'next':
                    command = 'next step';
                    break;
                case 'repeat':
                    command = 'repeating step'
                    break;
                case 'start over':
                    command = 'starting over';
                    break;

                case 'back':
                    command = 'going back one step';
                    break;

                default:
                    command= '';
            }
            return command;
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

    return [speech];
});
