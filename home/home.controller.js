(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$scope', '$rootScope', '$http', '$interval', 'AudioService'];
    function HomeController(UserService, $scope, $rootScope, $http, $interval, AudioService) {
        var vm = this;
        if($rootScope.minutes < 10){
            $scope.minute = "0" + $rootScope.minutes;
        }else{
            $scope.minute = $rootScope.minutes
        }
        if($rootScope.hours < 10){
            $scope.hour = "0" + $rootScope.hours;
        }else{
            $scope.hour = $rootScope.hours;
        }
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        $scope.messageLists = []
        initController();
        $scope.send = function () {
            var l = new Date();
            var time =l.toLocaleString()
            $scope.messageLists.push({"text":$scope.val, "time": time, "who":1})
            AudioService.cardOpen();
            $scope.val = "";
            var d = new Date();
            $scope.myMinuteMess = d.getMinutes();
            $scope.myHourMess = d.getHours()

            if($scope.myMinuteMess < 10){
                $scope.myMinuteMess = "0" + $scope.myMinuteMess;
            }
            if($scope.myHourMess < 10){
                $scope.myHourMess = "0" + $scope.myHourMess;
            }
            $scope.myDate = new Date();
            window.scrollTo(0,document.body.scrollHeight);

        }

        $(".textMess").on('keyup', function (e) {
            if (e.keyCode == 13) {
                $scope.send();
                $scope.$apply()
            }
        });
        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        $scope.showCvPerson = false;
        $http.get('home/cv.json').then(function (responseData) {
            $scope.messageData = responseData.data;
            $scope.messageLists = [];
            $scope.interval =$interval(function () {
                var index2 = Math.floor(Math.random() * $scope.messageData.length);
                $scope.messageLists.push($scope.messageData[index2])
                var d = new Date();
                $scope.minuteMess = d.getMinutes();
                $scope.hourMess = d.getHours()

                if($scope.minuteMess < 10){
                    $scope.minuteMess = "0" + $scope.minuteMess;
                }
                if($scope.hourMess < 10){
                    $scope.hourMess = "0" + $scope.hourMess;
                }
                $scope.date = new Date();
                AudioService.cardOpen();
                window.scrollTo(0,document.body.scrollHeight);
                $scope.$apply()
            }, 5000);


        })

        $scope.logout = function () {
            $interval.cancel($scope.interval);
        }

    }

})();