var app = angular.module('app', ['firebase'])

app.controller('ChecklistCtrl', ['$scope', '$firebase',
    function ($scope, $firebase) {
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
]);

