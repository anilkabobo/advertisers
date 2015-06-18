var myApp = angular.module('app', []);

myApp.controller('CommonController', [
  '$scope',
  'appGetServices',
  'appDeleteServices',
  'appPostServices',
  'mainData',
  function($scope, get, del, post, mainData) {
    $scope.allData = mainData;
    $scope.advVisibility = 'hidden';
    $scope.pixelPopup = 'closed';

    $scope.openAddAdvertiser = function() {
      $scope.addAdvertVisible = 'open';
      $scope.allData.currentAdv = null;
    }

    $scope.openEditAdvertiser = function(adv) {
      $scope.allData.currentAdv = adv.id;
      $scope.addAdvertVisible = 'open';
      $scope.allData.formData = {
        name: adv.name,
        city: adv.city,
        address: adv.address,
        tel: adv.tel,
        post_code: adv.post_code
      }
    }

    $scope.getAdvertisers = function() {
      get.advertisers().then(function(data) {
        $scope.allData.advertisers = data.data;
        $scope.advVisibility = 'visible';
      });
    }

    $scope.deleteAdv = function(ind) {
      del.advertiser(ind);
      getAllPixels();
    }

    $scope.addPixel =function(ind) {
      var form = document.getElementById('addPixel' + ind);
      var data = "name=" + form.name.value +
      "&advertiser_id=" + ind;

      post.pixels(data, function() {
        getAllPixels();
        form.reset();
      });
    }

    $scope.deletePixel = function(ind) {
      del.pixel(ind);
      getAllPixels();
    }

    $scope.openPixel = function(ind) {
      get.pixel(ind).then(function(data) {
        $scope.allData.currentPixel = data.data;
        $scope.pixelPopup = 'open';
      });
    }

    function getAllPixels() {
      get.pixels().then(function(data) {
        $scope.allData.pixels = data.data;
      });
    }

    $scope.getAdvertisers();
    getAllPixels();
  }
]);

myApp.controller('addAdvController', [
  '$scope',
  'appPostServices',
  'appPutServices',
  'mainData',
  function($scope, post, put, mainData) {
    $scope.allData = mainData;

    function resetForm() {
      $scope.allData.formData = {
        name: '',
        city: '',
        address: '',
        tel: '',
        post_code: ''
      }
      $scope.allData.currentAdv = null;
      $scope.$parent.addAdvertVisible = 'close';
      $scope.$parent.getAdvertisers();
    }

    $scope.addOrUpdateAdv = function() {
      var tempObj = $scope.allData.formData;
      var data = "name=" + tempObj.name +
      "&address=" + tempObj.address +
      "&tel=" + tempObj.tel +
      "&post_code=" + tempObj.post_code +
      "&city=" + tempObj.city;

      if ($scope.allData.currentAdv !== null) {
        put.advertiser($scope.allData.currentAdv, data).then(resetForm);
      }
      else {
        post.advertisers(data).then(resetForm);
      }
    }

    $scope.closeForm = function() {
      $scope.$parent.addAdvertVisible = 'closed';
      resetForm();
    }

    resetForm();
  }
]);


//Model for all data
myApp.factory('mainData', function() {
  return {
    advertisers: [],
    pixels: [],
    currentAdv: null
  }
});

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
      return $http.get('/pixels/' + n).then(function(result) {
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
      return $http.delete('/pixels/' + n).then(function(result) {
           return result.data;
       });
    }
  }
});

myApp.factory('appPutServices', function($http) {
  return {
    advertiser: function(n, data) {
      return $http.put('/advertisers/' + n, data).then(function(result) {
           return result.data;
       });
    }
  }
});
