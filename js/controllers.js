//angular.module('HackerNews.controllers', []);

angular.module('HackerNews.controllers').

/* topStories controller */
controller('newsController', function($scope, hackerNewsAPIservice, $window) {
  $scope.nameFilter = null;
  $scope.myOrderBy=null;
  $scope.IsDesc=false;
  $scope.storiesIds = [];
  $scope.stories= [];
  $scope.cred={userName:"osama", password:"123"};
  $scope.authorized=false;

  debugger;
 
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
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(story.title) || keyword.test(story.url);
  };

  $scope.sortStories = function(orderBy){
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

  $scope.setSelected = function(index){
    debugger;
    $scope.selected=index;
  }

  $scope.login=function(){
      debugger;
      if($scope.user.userName==$scope.cred.userName && 
              $scope.user.password==$scope.cred.password){
        $scope.authorized=true;
        $window.location.href = './';
      }
      else{
        alert("wrong credentials");
      }
  }
})


.controller('LoginController',
function ($scope, $rootScope, $window, AuthenticationService) {
    // reset login status
    AuthenticationService.ClearCredentials();

    $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
            if(response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);
                $window.location.href='./';
            } else {
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });
    };
});