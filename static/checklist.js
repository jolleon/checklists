var app = angular.module('app', ['ngRoute', 'firebase']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'CreateCtrl',
            templateUrl: '/static/create.html'
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

app.controller('ChecklistCtrl', function ($scope, $firebase, $routeParams) {
    var ref;
    if ($routeParams.listId){
        $scope.ref = $firebase(
            new Firebase('https://mychecklists.firebaseio.com/lists/' + $routeParams.listId)
        );
    } else {
        $scope.ref = $firebase(
            new Firebase('https://mychecklists.firebaseio.com/')
        );
    }
    $scope.items = $scope.ref.$child("items"); //{text: 'an item', done: true}, {text:'another item', done: false}];
    $scope.ref.$child("items").$bind($scope, "items");

    $scope.addItem = function() {
        $scope.items.$add({text: $scope.newItemText, done: false});
        $scope.newItemText = '';
    }

    $scope.remove = function(item) {
        $scope.items.$remove(item);
    }
}
);

app.controller('CreateCtrl', function ($scope, $firebase, $location) {
    $scope.create = function() {
        var id = "";
        for (var i=0; i<8; i++) {
            id += (Math.random() * 36 | 0).toString(36);
        }
        $location.path('/list/' + id);
    };
});
