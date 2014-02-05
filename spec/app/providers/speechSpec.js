define(["app/providers"], function () {

    describe('Provider: speech', function () {

        var speech,
            scope,
            rootScope,
            speechSynthesisUtteranceMock = jasmine.createSpy(),
            speechSynthesisMock = {
                speak: jasmine.createSpy()
            },
            speechRecognitionMock = function () {
                this.start = jasmine.createSpy();
                this.onstart = jasmine.createSpy();
                this.onerror = jasmine.createSpy();
                this.onresult = jasmine.createSpy();
            };


        beforeEach(module(function ($provide) {
            $provide.value('SpeechSynthesisUtterance', speechSynthesisUtteranceMock);
            $provide.value('speechSynthesis', speechSynthesisMock);
            $provide.value('webkitSpeechRecognition', speechRecognitionMock);
        }));

        beforeEach(function () {
            module('speechApi.providers');

            inject(function (_speech_, $rootScope) {
                speech = _speech_;
                scope = $rootScope.$new();
            });

        });

        describe('speech: synthesis', function () {

            it('should use the speech API to say the text passed into it', function () {
                speech.sayText('This is text spoken');
                speechSynthesisMock.speak();
                expect(speechSynthesisMock.speak).toHaveBeenCalled();
            });
        });

        describe('speech: recognition', function () {
            it('should use the speech API to start the speech recognition', function () {
                speech.speak();
                var recognition = new speechRecognitionMock();
                recognition.start();
                recognition.onstart();
                expect(recognition.onstart).toHaveBeenCalled();
                expect(recognition.start).toHaveBeenCalled();
            });

        });

    });


});
