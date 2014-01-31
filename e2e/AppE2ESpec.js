describe('Homepage Tests', function () {
    var ptor = protractor.getInstance();
    beforeEach(function () {
        ptor.get('http://localhost:8000/src');
    });

    it('Page should load and have the correct app name', function () {
        var message = ptor.findElement(protractor.By.tagName('h1'));
        expect(message.getText()).toEqual('Speech-Api');
    });
});
