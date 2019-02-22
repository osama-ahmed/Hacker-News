angular.module('HackerNews.controllers', []).

/* Drivers controller */
controller('newsController', function($scope, hackerNewsAPIservice) {
  $scope.nameFilter = null;
  $scope.storiesIds = [];
  $scope.stories= [];

 
  hackerNewsAPIservice.getBestStoriesIds().then(function mySuccess (response) {
      //Dig into the responde to get the relevant data
      debugger;
      $scope.storiesIds = response.data;

      for(var i=0;i<$scope.storiesIds.length;i++)
      {
        hackerNewsAPIservice.getStory($scope.storiesIds[i]).then(function mySuccess(response){
          debugger;
          if(response.data.type=="story"){
            response.data.time=$scope.convertUnixTimeToDate(response.data.time);
            $scope.stories.push(response.data);
          }
        });
      }

  }, function myError(response){
        alert(response);
  });

  debugger;

  

  $scope.searchFilter = function (story) {
    debugger;
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(story.title) || keyword.test(story.url);
    };

    $scope.convertUnixTimeToDate = function(unixTime){
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unixTime*1000);
      var day = date.getDay();
      var month = date.getMonth();
      var year = date.getFullYear();

      var formattedDate = day + "-" + month + "-" + year;

      return formattedDate;
    }
});