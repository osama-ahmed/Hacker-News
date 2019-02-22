angular.module('HackerNews.services', []).
factory('hackerNewsAPIservice', function($http) {

  var hnAPI = {};

  hnAPI.getBestStoriesIds = function() {
    return $http({
      method: 'GET', 
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    });
  }

  hnAPI.getStory = function(id) {
    return $http({
      method: 'GET', 
      url: 'https://hacker-news.firebaseio.com/v0/item/'+ id +'.json?print=pretty'
    });
  }

  return hnAPI;
});