(function () {
    'use strict';

    angular
        .module('app')
        .factory('AudioService', AudioService);

    AudioService.$inject = ['$rootScope'];
    function AudioService($rootScope) {
        return {
            cardOpen: function () {
                var audio = new Audio('sounds/clickOn.mp3');
                audio.play();

            }
        }
    }

})();