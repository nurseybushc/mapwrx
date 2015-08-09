// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers', 'ui.router', 'uiGmapgoogle-maps'])

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
})
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        key: 'AIzaSyB2FcPTq8rz635Tf_cLPvuuNJ9Vluz_-kk',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/home');

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
.controller('AppCtrl', ['$scope','$state', function($scope, $state) {
  $scope.selection = "Substation";
  $scope.map = function(){
    $state.go('map');
  };
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.searchItem )) {
        $scope.searchItem = toState.searchItem;
    }
  });
}])
.controller('AppCtrl2', ['$scope','uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
  uiGmapGoogleMapApi.then(function(maps) {});
  $scope.map = { center: { latitude: 33, longitude: -112 }, zoom: 8 };
}]);
