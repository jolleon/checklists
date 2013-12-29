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
    var ref = new Firebase('https://mychecklists.firebaseio.com/lists/' + $routeParams.listId)
    $scope.ref = $firebase(ref);
    // if items dont exist yet binding them directly initializes them as a
    // string in firebase, and then calling $add on that crashes... so if they don't exist
    // a workaround is to initialize the local list like below and this somehow
    // makes it work.
    // Don't do that if items already exist though or if the list is open in
    // another browser that makes it blink...
    ref.child("items").once('value', function(snapshot) {
        if (snapshot.val() === null){
            $scope.items = $scope.ref.$child("items");
        }
        $scope.ref.$child("items").$bind($scope, "items");
    });
    //$scope.name = "Loading checklist...";
    $scope.ref.$child("name").$bind($scope, "name");

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
    var ref = new Firebase('https://mychecklists.firebaseio.com/lists');
    $scope.lists = $firebase(ref);

    $scope.create = function() {
        $scope.creating = "true";
        var id = "";
        for (var i=0; i<8; i++) {
            id += (Math.random() * 36 | 0).toString(36);
        }
        var ref = new Firebase('https://mychecklists.firebaseio.com/lists/' + id);
        ref.child("name").set($scope.newName, function(error) {
            $location.path('/list/' + id);
            $scope.$apply();
        });
    };
});
