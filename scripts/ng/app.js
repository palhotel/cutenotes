var app = angular.module('myapp', ['ngRoute', 'ngAnimate', 'ngTouch']);

app.controller('mainController', ['$scope', function($scope){
	$scope.list = [{
		name: 'Tom', age: 18
	},{
		name: 'Amy', age: 17
	},{
		name: 'Joy', age: 18
	},{
		name: 'Jay', age: 18
	},{
		name: 'Joe', age: 18
	},{
		name: 'Nil', age: 18
	}];
	$scope.remove = function(idx){
		_.remove($scope.list, function (item) { return item === $scope.list[idx]; });
	}
}]);

