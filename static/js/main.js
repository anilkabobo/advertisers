var myApp = angular.module('app', []);

myApp.controller('CommonController', ['$scope', 'appGetServices', function($scope, get) {
  $scope.name = 'Alina';
  $scope.advVisibility = 'hidden'
  /*get.advertisers().then(function(d) {
    $scope.advertisers = d;
  })*/
  get.advertisers().then(function(data) {
    $scope.advertisers = data.data;
    $scope.advVisibility = 'visible';
    console.log(data);
  })
}]);

myApp.factory('appGetServices', function($http) {
  return {
    advertisers: function() {
      return $http.get('/advertisers').then(function(result) {
           return result.data;
       });
    }
  }
});
