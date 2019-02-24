angular.module('HackerNews', [
  'HackerNews.controllers',
  'HackerNews.services',
  'ngRoute',
  'ngCookies'
]).
config(
function ($routeProvider, $sceDelegateProvider)  {  

  $routeProvider.
  when("/topStories", {templateUrl: "partials/topStories.html", controller: "newsController"}).
  when("/topStories/:id", {templateUrl: "partials/story.html", controller: "newsController"}).
  when("/login", {templateUrl: "partials/login.html", controller: "LoginController"}).
  otherwise({redirectTo: '/topStories'});

  $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain. **.
      'https://hacker-news.firebaseio.com/**'
    ]);

   
  })

  .run(function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in
          if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
              $location.path('/login');
          }
      });
  });
