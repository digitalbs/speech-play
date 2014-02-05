define(["app/providers"], function () {

    describe('Provider: speech', function () {

        var speech,
            scope;

        var speechSynthesisUtteranceMock = jasmine.createSpy();
        var speechSynthesisMock = {
            speak: jasmine.createSpy()
        }


        beforeEach(module(function ($provide) {
            $provide.value('SpeechSynthesisUtterance', speechSynthesisUtteranceMock);
            $provide.value('speechSynthesis', speechSynthesisMock);
        }));

        beforeEach(function () {
            module('speechApi.providers');

            inject(function (_speech_, $rootScope) {
                speech = _speech_;
                scope = $rootScope.$new();
            });

        });

        describe('speech: recognition', function () {

            it('should use the speech API to say the text passed into it', function () {
                speech.sayText('This is text spoken');
                speechSynthesisMock.speak();
                expect(speechSynthesisMock.speak).toHaveBeenCalled();
            });
        });

    });


});
