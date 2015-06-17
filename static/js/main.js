var myApp = angular.module('app', []);

myApp.controller('CommonController', ['$scope', 'appGetServices', 'appDeleteServices', function($scope, get, del) {
  var currentAdv = null;
  $scope.advVisibility = 'hidden';

  $scope.openAddAdvertiser = function() {
    $scope.addAdvertVisible = 'open';
    currentAdv = null;
  }

  $scope.getAdvertisers = function() {
    get.advertisers().then(function(data) {
      $scope.advertisers = data.data;
      $scope.advVisibility = 'visible';
    });
  }

  $scope.deleteAdv = function(ind) {
    del.advertiser(ind);
    $scope.getAdvertisers();
  }

  $scope.getAdvertisers();

}]);

myApp.controller('addAdvController', ['$scope', 'appPostServices', function($scope, post) {  

  function setDefaults() {
    $scope.data = {
      name: '',
      city: '',
      address: '',
      tel: '',
      post_code: ''
    }
    
  }

  $scope.addOrUpdateAdv = function(event) {
    var data = "name=" + $scope.data.name +
    "&address=" + $scope.data.address +
    "&tel=" + $scope.data.tel +
    "&post_code=" + $scope.data.post_code +
    "&city=" + $scope.data.city;

    post.advertisers(data, function() {
      $scope.$parent.addAdvertVisible = 'close';
      $scope.$parent.getAdvertisers();
    });
  }

  setDefaults();

}]);

myApp.factory('appGetServices', function($http) {
  return {
    advertisers: function() {
      return $http.get('/advertisers').then(function(result) {
           return result.data;
       });
    },
    advertiser: function(n) {
      return $http.get('/advertisers/' + n).then(function(result) {
           return result.data;
       });
    },
    pixels: function() {
      return $http.get('/pixels').then(function(result) {
           return result.data;
       });
    },
    pixel: function(n) {
      return $http.get('/pixel/' + n).then(function(result) {
           return result.data;
       });
    }
  }
});

myApp.factory('appPostServices', function($http) {
  return {
    advertisers: function(data, callback) {
      return $http.post('/advertisers', data).
        success(callback).
        error(function(data) {
          console.log(data);
        });
    },
    advertiser: function(n, data, callback) {
      return $http.post('/advertisers/' + n, data).
        success(callback).
        error(function(data) {
          console.log(data);
        });
    },
    pixels: function(data, callback) {
      return $http.post('/pixels', data).
        success(callback).
        error(function(data) {
          console.log(data);
        });
    },
    pixel: function(n, data, callback) {
      return $http.post('/pixel/' + n, data).
        success(callback).
        error(function(data) {
          console.log(data);
        });
    }
  }
});

myApp.factory('appDeleteServices', function($http) {
  return {
    advertiser: function(n) {
      return $http.delete('/advertisers/' + n).then(function(result) {
           return result.data;
       });
    },
    pixel: function(n) {
      return $http.delete('/pixel/' + n).then(function(result) {
           return result.data;
       });
    }
  }
});