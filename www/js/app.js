// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

exampleApp.controller("ExampleController", function($scope, $cordovaBarcodeScanner){
  $scope.scanBarcode = function(){
    $cordovaBarcodeScanner.scan().then(function(imageData){
      var sucursal = "";
      var str = "";
      var producto = "";

      sucursal = $('#sucursal').val();
      str = imageData.text;
      producto = str.substring(0,12);

      if (producto != "") {
        $.post("url" ,
          {
            sucursal:sucursal,
            producto:producto
          }, function(data){
            if (data != false) {
              $('#contenidoFiltro').html(data);
            }else{
              $('#contenidoFiltro').html("no hay coincidencias en stock" + data);
              }
            }  
          );
      };

    },function (error){
      $('#contenidoFiltro').html("hubo un error" + error);
    });
  }
});
