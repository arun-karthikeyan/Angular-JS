'use strict';

var app = angular.module('confusionApp',[]);
app.controller('MenuController',['$scope', function($scope){

  $scope.tab = 1;
  $scope.filtText = "";
  $scope.showDetails = false;

  var dishes=[
    {
      name:'Uthapizza',
      image: 'images/uthapizza.png',
      category: 'mains',
      label:'Hot',
      price:'4.99',
      description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
      // comment: ''
    },
    {
      name:'Zucchipakoda',
      image: 'images/zucchipakoda.png',
      category: 'appetizer',
      label:'',
      price:'1.99',
      description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
      // comment: ''
    },
    {
      name:'Vadonut',
      image: 'images/vadonut.png',
      category: 'appetizer',
      label:'New',
      price:'1.99',
      description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
      // comment: ''
    },
    {
      name:'ElaiCheese Cake',
      image: 'images/elaicheesecake.png',
      category: 'dessert',
      label:'',
      price:'2.99',
      description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
      // comment: ''
    }
  ];
  //Doing this makes the 'dishes' object available to the HTML
  $scope.dishes = dishes;


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
.controller('DishDetailController', ['$scope', function($scope) {
  $scope.predicate='';
  var dish={
    name:'Uthapizza',
    image: 'images/uthapizza.png',
    category: 'mains',
    label:'Hot',
    price:'4.99',
    description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    comments: [
      {
        rating:5,
        comment:"Imagine all the eatables, living in conFusion!",
        author:"John Lemon",
        date:"2012-10-16T17:57:28.556094Z"
      },
      {
        rating:4,
        comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author:"Paul McVites",
        date:"2014-09-05T17:57:28.556094Z"
      },
      {
        rating:3,
        comment:"Eat it, just eat it!",
        author:"Michael Jaikishan",
        date:"2015-02-13T17:57:28.556094Z"
      },
      {
        rating:4,
        comment:"Ultimate, Reaching for the stars!",
        author:"Ringo Starry",
        date:"2013-12-02T17:57:28.556094Z"
      },
      {
        rating:2,
        comment:"It's your birthday, we're gonna party!",
        author:"25 Cent",
        date:"2011-12-02T17:57:28.556094Z"
      }

    ]
  };

  $scope.dish = dish;

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
