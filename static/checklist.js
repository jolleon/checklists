var app = angular.module('app', ['ngRoute', 'firebase']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'ChecklistCtrl',
            templateUrl: '/static/checklist.html'
        })
        .when('/list/:listId', {
            controller: 'ChecklistCtrl',
            templateUrl: '/static/checklist.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.config(['$locationProvider', function($locationProvider){
        $locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.controller('ChecklistCtrl', function ($scope, $firebase) {
        var ref = new Firebase('https://mychecklists.firebaseio.com/items')
        $scope.ref = $firebase(ref);
        $scope.ref.$bind($scope, "items");
    //[{text: 'an item', done: true}, {text:'another item', done: false}];

        $scope.addItem = function() {
            $scope.items.$add({text: $scope.newItemText, done: false});
            $scope.newItemText = '';
        }

        $scope.remove = function(item) {
            $scope.items.$remove(item);
        }
    }
);

