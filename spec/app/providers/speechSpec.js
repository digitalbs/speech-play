define(["app/providers"], function () {

    describe('Provider: speech', function () {

        var speech,
            webkitSpeechRecognitionMock = jasmine.createSpy();



        beforeEach(function () {
            module('speechApi.providers');

            inject(function (_speech_, $provide) {
                $provide.value('webkitSpeechRecognition', webkitSpeechRecognitionMock);
                speech = _speech_;
            });

        });

        it('returns the name of the provider', function () {
            expect(speech.sayText()).toHaveBeenCalled();
        });
    });


});
