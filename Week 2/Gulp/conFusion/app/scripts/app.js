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
}]);
