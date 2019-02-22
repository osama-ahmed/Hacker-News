angular.module('HackerNews', [
  'HackerNews.controllers',
  'HackerNews.services',
  'ngRoute'
]).
config(
function ($routeProvider, $sceDelegateProvider)  {  

  $routeProvider.
  when("/topStories", {templateUrl: "partials/topStories.html", controller: "newsController"}).
  when("/topStories/:id", {templateUrl: "partials/story.html", controller: "newsController"}).
  otherwise({redirectTo: '/topStories'});

  $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain. **.
      'https://hacker-news.firebaseio.com/**'
    ]);

   
  });
