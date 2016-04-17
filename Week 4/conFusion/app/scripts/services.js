'use strict';

angular.module('confusionApp')
.constant("baseURL", "http://localhost:3000/")
.service('menuFactory',['$resource', 'baseURL', function($resource, baseURL) {

  this.getDishes = function(){

    return $resource(baseURL+"dishes/:id", null,
    {'update': {method: 'PUT'}});

  };

  this.getPromotions = function(){
    return $resource(baseURL+"promotions/:id");
  };


}])

.factory('corporateFactory',['$resource', 'baseURL', function($resource, baseURL) {

  var corpfac = {};

  corpfac.getLeaders = function(){
    return $resource(baseURL+'leadership/:id');
  };

  return corpfac;
}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL){

  var feedbackFac = {};

  feedbackFac.getFeedbackResource = function(){
    return $resource(baseURL+'feedback/:id');
  };

  return feedbackFac;
}]);
