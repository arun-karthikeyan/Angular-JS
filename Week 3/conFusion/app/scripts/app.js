'use strict';
// angular.module('confusionApp',['ngRoute'])
// .config(function($routeProvider){
//   $routeProvider
//   //route for the contactus page
//   .when('/contactus', {
//     templateUrl: 'contactus.html',
//     controller: 'ContactController'
//   })
//   // route for the menu page
//   .when('/menu', {
//     templateUrl: 'menu.html',
//     controller: 'MenuController'
//   })
//   //route for the dishdetail page
//   .when('/menu/:id', {
//     templateUrl: 'dishdetail.html',
//     controller: 'DishDetailController'
//   })
//   //default page, and also it must be defined in one of the .when('page') above to work.
//   .otherwise('/contactus');
// });

//using angular ui-router
angular.module('confusionApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  // route for the home page
  .state('app', {
    url: '/',
    views: {
      //different views available in the home page - supporting multiple views
      'header': {
        templateUrl: 'views/header.html'
      },
      'content': {
        template: '<h1>To be Completed</h1>',
        controller: 'IndexController'
      },
      'footer': {
        templateUrl: 'views/footer.html'
      }
    }
  })
  // route for the about us page - nested state
  .state('app.aboutus', {
    url: 'aboutus',
    views: {
      'content@': {
        template: '<h1>To be completed</h1>',
        controller: 'AboutController'
      }
    }
  })
  // route for the contactus page - nested state
  .state('app.contactus', {
    url: 'contactus',
    views: {
      'content@': {
        templateUrl: 'views/contactus.html',
        controller: 'ContactController'
      }
    }
  })
  //route for the menu page
  .state('app.menu', {
    url: 'menu',
    views: {
      'content@': {
        templateUrl: 'views/menu.html',
        controller: 'MenuController'
      }
    }
  })
  //route for the dishdetail page
  .state('app.dishdetails', {
    url: 'menu/:id',
    views: {
      'content@': {
        templateUrl: 'views/dishdetail.html',
        controller: 'DishDetailController'
      }
    }
  });

  //route for the default page
  $urlRouterProvider.otherwise('/');
});
