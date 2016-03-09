'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= menuFactory.getDishes();


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

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", invalidChannelSelection: false };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;

        }])

        .controller('FeedbackController', ['$scope', function($scope) {

            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && (($scope.feedback.mychannel === "") || ($scope.feedback.mychannel===null) || ($scope.feedback.mychannel===undefined))) {
                    $scope.feedback.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.feedback.invalidChannelSelection = false;
                    $scope.feedback.firstName="";
                    $scope.feedback.lastName="";
                    $scope.feedback.agree=false;
                    $scope.feedback.email="";
                    $scope.feedback.mychannel="";
                    $scope.feedback.comments="";
                    $scope.feedback.tel.number="";
                    $scope.feedback.tel.areaCode="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            var dish= menuFactory.getDish(parseInt($stateParams.id,10));

            $scope.dish = dish;

        }])

        .controller('DishCommentController', ['$scope', function($scope) {

            $scope.mycomment = {rating:5, comment:"", author:"", date:""};

            $scope.submitComment = function () {

                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);

                $scope.dish.comments.push($scope.mycomment);

                $scope.commentForm.$setPristine();

                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){
          var featuredDishIdx = 0;
          var executiveChefIdx = 3;
          var promotionIdx = 0;
          $scope.promotion = menuFactory.getPromotion(promotionIdx);
          $scope.featuredDish = menuFactory.getDish(featuredDishIdx);
          $scope.specialist = corporateFactory.getLeader(executiveChefIdx);

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
          var leadership = corporateFactory.getLeaders();
          $scope.leadership = leadership;
        }])
        // implement the IndexController and About Controller here


;
