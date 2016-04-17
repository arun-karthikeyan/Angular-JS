//Contains tests for the MenuController

//basic configuration for the test

describe('Controller: MenuController', function(){
  //In this function we will carry out all the tests required for the MenuController

  //load the controller's module
  //beforeEach specifies what needs to be setup before the test is run
  beforeEach(module('confusionApp')); //This is a mock module of the confusion app that is setup so that the controller can be tested

  //variables made use of for configuring the tests
  var MenuController, scope, $httpBackend;

  //Injection of the mock information
  //Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, menuFactory) {


    //mocked dependencies are placed here
    //this is to make sure that there is no conflicting incoming parameters
    $httpBackend = _$httpBackend_; // the underscores will be automatically removed by Angular when the test is being run

    //when it gets a request for the specified url, the $httpBackend will response with the JSON Object array specified in the respond part
    $httpBackend.expectGET("http://localhost:3000/dishes").respond([
      {
        "id": 0,
        "name": "Uthapizza",
        "image": "images/uthapizza.png",
        "category": "mains",
        "label": "Hot",
        "price": "4.99",
        "description": "A",
        "comments":[{}]
      },
      {
        "id": 1,
        "name": "Zucchipakoda",
        "image": "images/zucchipakoda.png",
        "category": "mains",
        "label": "New",
        "price": "4.99",
        "description": "A",
        "comments":[{}]
      }
    ]);

    //this is how you can create a new scope under the rootScope and use it when carrying out the tests
    scope = $rootScope.$new();

    //create a controller with the parameters $scope and menuFactory
    MenuController = $controller('MenuController', {
      $scope: scope, menuFactory: menuFactory
    });

    //When the request is received the flush will cause the reply to be flushed back to the module so that the test can be carried out swiftly.
    $httpBackend.flush();


  })); //End of beforeEach


  //this is how we should specify tests in Jasmine
  //also we have a string to specify what the test is doing - 'should have showDetails as false'; it helps making meaningful inferences when the test fails or passes without having to look at the code
  it('should have showDetails as false', function(){
    //checks whether scope.showDetails is false
    //this is Jasmine's way of asserting that this has a value equal to boolean 'false'
    expect(scope.showDetails).toBeFalsy();
  });

  //the XML_HTTP_REQUEST here is actually the $httpBackend, since that is our mock server
  it('should create "dishes" with 2 dishes fetched from XML_HTTP_REQUEST', function(){
    expect(scope.showMenu).toBeTruthy();  //makes sure that showMenu has a value of boolean true
    expect(scope.dishes).toBeDefined();   //makes sure the scope.dishes actually exists
    expect(scope.dishes.length).toBe(2);  //makes sure that scope.dishes.length has a value of 2
    //value of 2 because we have only sent a JSON Object of length 2 as a response from $httpBackend, here we are making sure whether both of them have been properly received
  });

  //Testing whether the received data has all the required properties; here we are just testing a few properties at random
  it('should have the correct data order in the dishes', function(){
    expect(scope.dishes[0].name).toBe("Uthapizza");
    expect(scope.dishes[1].label).toBe("New");
  });

  //Checking the nav-tab and values
  it('should change the tab selected based on tab clicked', function(){
    expect(scope.tab).toEqual(1);
    scope.select(3);
    expect(scope.tab).toEqual(3);
    expect(scope.filtText).toEqual('mains');

  }); //Enf of it()

});//End of describe

//Test Driven Development is basically writing all the test code first, and then writing the app-dev code to pass these tests
