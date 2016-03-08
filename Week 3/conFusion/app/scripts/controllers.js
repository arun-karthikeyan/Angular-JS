'use strict';

angular.module('confusionApp')
.controller('MenuController',['$scope', 'menuFactory', function($scope, menuFactory){

  $scope.tab = 1;
  $scope.filtText = "";
  $scope.showDetails = false;


  //Doing this makes the 'dishes' object available to the HTML
  $scope.dishes = menuFactory.getDishes();


  $scope.select = function(setTab){
    $scope.tab = setTab;
    if(setTab === 2){
      $scope.filtText="appetizer";
    }else if (setTab === 3) {
      $scope.filtText = "mains";
    }else if (setTab === 4) {
      $scope.filtText = "dessert";
    }else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(tabNo){
    return $scope.tab === tabNo;
  };

  $scope.toggleDescription = function(){
    $scope.showDetails = !$scope.showDetails;
  };

}])
//Parent Controller
.controller('ContactController', ['$scope', function($scope){

  $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", invalidChannelSelection: false, comments:"", tel:{number:"", areaCode:""}};
  var channels = [{
    value:"tel", label:"Tel."
  },
  {
    value:"email", label:"Email"
  }];

  $scope.channels = channels;
}])
//Child Controller - inherits the scope of the Parent Controller (ContactController)
.controller('FeedbackController', ['$scope', function($scope){
  $scope.sendFeedback = function() {
    console.log($scope.feedback);

    //JS side validation of 'feedbackForm'
    if($scope.feedback.agree && (($scope.feedback.mychannel==="") || $scope.feedback.mychannel===null || $scope.feedback.mychannel===undefined)){
      $scope.feedback.invalidChannelSelection = true;
      console.log('incorrect');
    }else{

      //doesn't work because the below statement is treated as a primitive and a new child primitive is created
      // $scope.feedback = {
      //   mychannel:"", firstName:"", lastName:"", agree:false, email:""
      // };

      //the below correctly updates the parent scope objects
      $scope.feedback.mychannel="";
      $scope.feedback.firstName="";
      $scope.feedback.lastName="";
      $scope.feedback.agree=false;
      $scope.feedback.email="";
      $scope.feedback.invalidChannelSelection=false;
      $scope.feedback.comments="";
      $scope.feedback.tel.number="";
      $scope.feedback.tel.areaCode="";
      $scope.feedbackForm.$setPristine();
      console.log('correct');
      //logging the re-initialized empty feedback
      console.log($scope.feedback);
    }
  };
}])
//Dish Detail Controller Code
.controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {
  $scope.predicate='';
  $scope.dish = menuFactory.getDish(parseInt($routeParams.id, 10));

}])
//Dish Comment Controller Code
.controller('DishCommentController', ['$scope', function($scope) {

  $scope.initPreviewComment = function(){
    $scope.previewComment = {};
    $scope.previewComment.author = "";
    $scope.previewComment.rating = "5"; //setting default initial rating
    $scope.previewComment.comment = "";
    $scope.previewComment.date = "";
  };

  $scope.submitComment = function () {

    // Step 2: This is how you record the date
    $scope.previewComment.date = new Date().toISOString();

    // Step 3: Push your comment into the dish's comment array
    $scope.dish.comments.push($scope.previewComment);

    //Step 4: reset your form to pristine
    $scope.commentForm.$setPristine();

    //Step 5: reset your JavaScript object that holds your comment
    $scope.initPreviewComment();
  };

  //Step 1: Create a JavaScript object to hold the comment from the form
  $scope.initPreviewComment();

}]);
