var app = angular.module('app', ['ui'])

app.controller('ChecklistCtrl', function ($scope) {
    $scope.items = [{text: 'an item', done: true}, {text:'another item', done: false}];

    $scope.addItem = function() {
        $scope.items.push({text: $scope.newItemText, done: false});
        $scope.newItemText = '';
    }

    $scope.remove = function(item) {
        var index = $scope.items.indexOf(item);
        if (index > -1) {
            $scope.items.splice(index, 1);
        }
    }
})

