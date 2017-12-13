'use strict';

var app = angular.module('app', ['chart.js']);

app.factory('Services', ['$http', function($http){
  var getCryptoData = function(){
    return $http.get('https://api.coinmarketcap.com/v1/ticker/?limit=10');
  }
  return{
    getCryptoData : getCryptoData
  }
}]);

app.controller('BarChartController', ['$scope','Services', function ($scope, Services) {

  getCryptoData();

  function getCryptoData(){

    console.log("called");
    Services.getCryptoData().then(function(response){

      if(response.data != null){

        $scope.header = "Cryptocurrency Chart USD Market";
        $scope.labels = [];
        $scope.data = [];

        for (var crypto of response.data) {
          $scope.labels.push(crypto.symbol);
          $scope.data.push(crypto.price_usd);
        }

      }else{
        window.location.href = '/serviceUnavailable';
      }
    }).catch(function(err){
       window.location.href = '/serviceUnavailable';
    });
  }
  setInterval(function(){
    getCryptoData();
  },300000);

}]);
