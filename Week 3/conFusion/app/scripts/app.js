'use strict';
angular.module('confusionApp',['ngRoute'])
.config(function($routeProvider){
  $routeProvider
  //route for the contactus page
  .when('/contactus', {
    templateUrl: 'contactus.html',
    controller: 'ContactController'
  })
  // route for the menu page
  .when('/menu', {
    templateUrl: 'menu.html',
    controller: 'MenuController'
  })
  //route for the dishdetail page
  .when('/menu/:id', {
    templateUrl: 'dishdetail.html',
    controller: 'DishDetailController'
  })
  //default page, and also it must be defined in one of the .when('page') above to work.
  .otherwise('/contactus');
});
