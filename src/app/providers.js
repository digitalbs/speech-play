define(['app/providers/speech'], function(speech){
	angular.module('speechApi.providers', [])
    .factory('speech',speech);
});
