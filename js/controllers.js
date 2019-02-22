angular.module('HackerNews.controllers', []).

/* topStories controller */
controller('newsController', function($scope, hackerNewsAPIservice) {
  $scope.nameFilter = null;
  $scope.myOrderBy=null;
  $scope.IsDesc=false;
  $scope.storiesIds = [];
  $scope.stories= [];

 
  hackerNewsAPIservice.getBestStoriesIds().then(
    function mySuccess (response) {
      //Dig into the responde to get the relevant data
      $scope.storiesIds = response.data;

      for(var i=0;i<$scope.storiesIds.length;i++)
      {
        hackerNewsAPIservice.getStory($scope.storiesIds[i]).then(function mySuccess(response){
          if(response.data.type=="story"){
            response.data.time=$scope.convertUnixTimeToDate(response.data.time);
            $scope.stories.push(response.data);
          }
        });
      }

    }, 
    function myError(response){
      alert(response);
    }
  );
  

  $scope.searchFilter = function (story) {
    debugger;
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(story.title) || keyword.test(story.url);
  };

  $scope.sortStories = function(orderBy){
    debugger;
    if($scope.myOrderBy==orderBy)
        $scope.IsDesc=!$scope.IsDesc;
    else
        $scope.IsDesc=false;

    $scope.myOrderBy=orderBy;
  }

  $scope.convertUnixTimeToDate = function(unixTime){
    var date = new Date(unixTime*1000);
    return date;
  }
});