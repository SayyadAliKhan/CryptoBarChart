var app = angular.module('app', ['chart.js']);

app.factory('Services', ['$http', function($http){
  var getCryptoData = function(){
    return $http.get('/usdMarket');
  }
  return{
    getCryptoData : getCryptoData
  }
}]);

app.controller('BarChartController', ['$scope','Services', function ($scope, Services) {
  getCryptoData();
  function getCryptoData(){
    Services.getCryptoData().then(function(response){
      $scope.labels = [];
      $scope.data = [];
      if(response.state == 'success'){
        $scope.series = ['Cryptocurrency'];
        angular.forEach(response.body.crypto, function(value, key){
          $scope.labels[key] = value.symbol;
          $scope.data[key] = value.price_usd;
        });
      }
    });
  }

  setInterval(function(){
    getCryptoData();
  },300000);

}]);
