var myApp = angular.module('app', []);

myApp.controller('CommonController', ['$scope', function($scope) {
  $scope.name = 'Alina';
}]);

myApp.factory('myService', function($http) {
  return {
    getAdvertisers: function() {
      return $http.get('/foos')
        .then(function(result) {
            //resolve the promise as the data
            return result.data;
        });
    }
  }
});