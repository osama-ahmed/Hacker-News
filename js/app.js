angular.module('HackerNews', [
  'HackerNews.controllers',
  'HackerNews.services',
  'ngRoute'
]).
config(
function ($routeProvider, $sceDelegateProvider)  {  

  $routeProvider.
  when("/drivers", {templateUrl: "partials/drivers.html", controller: "newsController"}).
  when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "newsController"}).
  otherwise({redirectTo: '/drivers'});

  $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain. **.
      'https://hacker-news.firebaseio.com/**'
    ]);

   
  });
