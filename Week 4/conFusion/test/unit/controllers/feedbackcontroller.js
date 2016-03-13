//Contains test for the Feedback Controller

describe('Controller : FeedbackController', function(){
//load corresponding module
beforeEach(module('confusionApp'));

//variables for configuring the tests
var $scope, FeedbackController, $httpBackend;
//inject the controller and its dependencies
beforeEach(inject(function($rootScope, _$httpBackend_, feedbackFactory, $controller){

$httpBackend = _$httpBackend_;
$scope = $rootScope.$new();

//trying to mock parent controller's variables
$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", tel: {number: "", areaCode: ""}, comments:""};

$scope.feedbackForm = {
  $setPristine : function(){
    $scope.feedbackForm.pristine = true;
  }
};
$scope.channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

FeedbackController = $controller('FeedbackController', {
$scope: $scope, feedbackFactory: feedbackFactory
});

}));

it('should send feedback to server and reset feedback after success/error call', function(){

//setting up sample feedback Object
function initScopeFeedback(){
  $scope.feedback.firstName="Arun";
  $scope.feedback.lastName="Karthikeyan";
  $scope.feedback.agree=true;
  $scope.feedback.email="akarthi2@asu.edu";
  $scope.feedback.mychannel="Email";
  $scope.feedback.comments="Great Restaurant";
  $scope.feedback.tel.number="4567890";
  $scope.feedback.tel.areaCode="123";
}

initScopeFeedback();
//holding the $scope.feedback reference
var feedbackReference = $scope.feedback;
//setting up the httpback end server
var postResponse = $httpBackend.whenPOST("http://localhost:3000/feedback").respond(201,'');
$scope.sendFeedback();

//checking if the reference gets reset before success call
expect(feedbackReference.firstName).not.toEqual("");
expect(feedbackReference.lastName).not.toEqual("");
expect(feedbackReference.agree).toBeTruthy();
expect(feedbackReference.email).not.toEqual("");
expect(feedbackReference.mychannel).not.toEqual("");
expect(feedbackReference.comments).not.toEqual("");
expect(feedbackReference.tel.number).not.toEqual("");
expect(feedbackReference.tel.areaCode).not.toEqual("");

//the feedbacks have to be reset after success response from server
$httpBackend.flush(); //response from the server

expect($scope.feedback.firstName).toEqual("");
expect($scope.feedback.lastName).toEqual("");
expect($scope.feedback.agree).toBeFalsy();
expect($scope.feedback.email).toEqual("");
expect($scope.feedback.mychannel).toEqual("");
expect($scope.feedback.comments).toEqual("");
expect($scope.feedback.tel.number).toEqual("");
expect($scope.feedback.tel.areaCode).toEqual("");

initScopeFeedback();
feedbackReference = $scope.feedback;

postResponse.respond(404,'Resource Not Found');
$scope.sendFeedback();
//checking if the reference gets reset before success call
expect(feedbackReference.firstName).not.toEqual("");
expect(feedbackReference.lastName).not.toEqual("");
expect(feedbackReference.agree).toBeTruthy();
expect(feedbackReference.email).not.toEqual("");
expect(feedbackReference.mychannel).not.toEqual("");
expect(feedbackReference.comments).not.toEqual("");
expect(feedbackReference.tel.number).not.toEqual("");
expect(feedbackReference.tel.areaCode).not.toEqual("");
//the feedbacks have to be reset after error response from server
$httpBackend.flush(); //response from the server

expect($scope.feedback.firstName).toEqual("");
expect($scope.feedback.lastName).toEqual("");
expect($scope.feedback.agree).toBeFalsy();
expect($scope.feedback.email).toEqual("");
expect($scope.feedback.mychannel).toEqual("");
expect($scope.feedback.comments).toEqual("");
expect($scope.feedback.tel.number).toEqual("");
expect($scope.feedback.tel.areaCode).toEqual("");

});




});
