'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;

  $scope.showMenu = false;
  $scope.message = "Loading...";
  //it is initially assigned with an empty array,
  //once the response is received from the server, the data is loaded into $scope.dishes
  $scope.dishes= menuFactory.getDishes().query(
    function(response){
      $scope.dishes = response;
      $scope.showMenu = true;
    }, function(response){
      $scope.message = "Error: "+response.status+" "+response.statusText;
    }
  );

  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    }
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
}])

.controller('ContactController', ['$scope', function($scope) {

  $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", tel: {number: "", areaCode: ""}};

  var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

  $scope.channels = channels;

}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

  function resetFeedback(){
    $scope.feedback.firstName="";
    $scope.feedback.lastName="";
    $scope.feedback.agree=false;
    $scope.feedback.email="";
    $scope.feedback.mychannel="";
    $scope.feedback.comments="";
    $scope.feedback.tel.number="";
    $scope.feedback.tel.areaCode="";
    $scope.feedbackForm.$setPristine();
  }

  $scope.sendFeedback = function() {

    if ($scope.feedback.agree && (($scope.feedback.mychannel === "") || ($scope.feedback.mychannel===null) || ($scope.feedback.mychannel===undefined))) {
      $scope.invalidChannelSelection = true;
    }
    else {
      $scope.invalidChannelSelection = false;
      if(!$scope.feedback.agree){
        $scope.feedback.mychannel="";
      }
      var feedbackResource = feedbackFactory.getFeedbackResource();
      feedbackResource.save($scope.feedback, function(response){
        console.log("Entry added", response);
        resetFeedback();
      }, function(response){
        console.log("Failed to add entry: "+response.status+" "+response.statusText);
        resetFeedback();
      });
    }
  };

}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

  $scope.showDish = false;
  $scope.message = "Loading...";
  //this way the getDishes method will return the specific dish that we are asking for
  $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)}).$promise.then(
    function(response){
      $scope.dish = response;
      $scope.showDish = true;
    },
    function(response){
      $scope.message = "Error: "+response.status+" "+response.statusText;
    }
  );

}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

  function initPreviewComment(){
    $scope.previewComment = {};
    $scope.previewComment.author = "";
    $scope.previewComment.rating = "5"; //setting default initial rating
    $scope.previewComment.comment = "";
    $scope.previewComment.date = "";
  }

  $scope.submitComment = function () {
    $scope.previewComment.date = new Date().toISOString();
    $scope.dish.comments.push($scope.previewComment);
    menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
    $scope.commentForm.$setPristine();
    initPreviewComment();
  };

  initPreviewComment();
}])

.controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){
  var featuredDishIdx = 0;
  var executiveChefIdx = 3;
  var promotionIdx = 0;

  $scope.showFeaturedDish = false;
  $scope.featuredDishMessage = "Loading...";

  $scope.showSpecialist = false;
  $scope.specialistMessage = "Loading...";

  $scope.showPromotion = false;
  $scope.promotionMessage = "Loading...";

  $scope.featuredDish = menuFactory.getDishes().get({id: featuredDishIdx}).$promise.then(
    function(response){
      $scope.featuredDish = response;
      $scope.showFeaturedDish = true;
    }, function(response){
      $scope.featuredDishMessage = "Error: "+response.status+" "+response.statusText;
    }
  );

  $scope.specialist = corporateFactory.getLeaders().get({id: executiveChefIdx}).$promise.then(
    function(response){
      $scope.specialist = response;
      $scope.showSpecialist = true;
    },
    function(response){
      $scope.specialistMessage = "Error: "+response.status+" "+response.statusText;
    }
  );

  $scope.promotion = menuFactory.getPromotions().get({id: promotionIdx}).$promise.then(
    function(response){
      $scope.promotion = response;
      $scope.showPromotion = true;
    },
    function(response){
      $scope.promotionMessage = "Error: "+response.status+" "+response.statusText;
    }
  );

}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){

  $scope.showLeaders = false;
  $scope.message = "Loading...";

  $scope.leadership = corporateFactory.getLeaders().query(function(response){
    $scope.showLeaders = true;
    $scope.leadership = response;
  }, function(response){
    $scope.message = "Error: "+response.status+" "+response.statusText;
  });

}])
// implement the IndexController and About Controller here


;
