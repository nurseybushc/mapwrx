// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/map');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/map.html'
      })
      .state('map', {
        url: '/map',
        templateUrl: 'templates/search.html'
      });
  });
angular.module('starter.controllers', [])
  .controller('AppCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.selection = "Substation";
    $scope.map = function() {
      $state.go('map');
    };

  }])
  .controller('AppCtrl2', function($scope, $compile, $ionicModal, $rootScope, $ionicLoading) {
    $scope.init = function() {
      $scope.selection = "Substation";

      $scope.modal = document.getElementById('dirModal');
      $scope.modal.style.display = 'none';
      $scope.showButton = document.getElementById('showButton');
      $scope.showButton.style.display = 'block';

      $scope.search = document.getElementById('searchModal');
      $scope.search.style.display = 'none';
      $scope.searchButton = document.getElementById('searchButton');
      $scope.searchButton.style.display = 'block';

      //$scope.value = "maps://?q=dallas";
      /* Setup the loading
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });*/
      var cityCircle;

    };

    $scope.hideDiv = function() {
      $scope.modal.style.display = 'none';
      $scope.showButton.style.display = 'block';
    };
    $scope.showDiv = function() {
      $scope.modal.style.display = 'block';
      $scope.showButton.style.display = 'none';
    };
    $scope.hideSearch = function() {
      $scope.search.style.display = 'none';
      $scope.searchButton.style.display = 'block';
    };
    $scope.showSearch = function() {
      $scope.search.style.display = 'block';
      $scope.searchButton.style.display = 'none';
    };

    function initialize() {
      //var ref = window.open('http://apache.org', '_blank', 'location=yes');
      var directionsService = new google.maps.DirectionsService();//its okay theres no parentheses
      var directionsDisplay = new google.maps.DirectionsRenderer();//its okay theres no parantheses

      var mapOptions = {
        center: { lat: 33, lng: -112},
        zoom: 8
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('directions-panel'));

      $scope.map = map;

      var contentString = "<div>Your departing location</a></div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
      });
      var contentString2 = "<div>Your arriving location</a></div>";
      var compiled2 = $compile(contentString2)($scope);

      var infowindow2 = new google.maps.InfoWindow({
          content: compiled2[0]
      });
      var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(33.243304, -111.829817),
        map: map
      });
      google.maps.event.addListener(marker2, 'click', function() {
          infowindow2.open(map,marker2);
        });
      navigator.geolocation.getCurrentPosition(function(pos) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });
      calculateAndDisplayRoute(directionsService, directionsDisplay, pos.coords.latitude, pos.coords.longitude);

      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay, latitude, longitude) {
      directionsService.route({
        destination: new google.maps.LatLng(33.243304, -111.829817),
        origin: new google.maps.LatLng(latitude, longitude),
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          //$ionicLoading.hide();
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    ionic.Platform.ready(initialize);

    //line above replaces the line below in ionic
    //google.maps.event.addDomListener(window, 'load', initialize);
  });
