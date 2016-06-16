angular.module('starter.controllers', [])

.controller('ItineraryCtrl', function($scope, $ionicModal, Itineraries) {
    $scope.itineraries = Itineraries.all();
    $scope.remove = function(itinerary) {
        Itineraries.remove(itinerary);
    };
    $scope.addItinerary = function() {
        $ionicModal.fromTemplateUrl('itineraryAdd.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.itineraryAdd = modal;
            $scope.itineraryAdd.show();
        });
    };
    $scope.addItineraryconfirm = function(itinerary) {
        Itineraries.add(itinerary);
        $scope.itineraryAdd.hide();
    };
    $scope.edit = function(itinerary) {
        $scope.current = itinerary;
        $ionicModal.fromTemplateUrl('itineraryEdit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.itineraryEdit = modal;
            $scope.itineraryEdit.show();
        });
    };
    $scope.editItinerary = function(itinerary) {
        Itineraries.edit($scope.current, itinerary);
        $scope.itineraryEdit.hide();
    };
    $scope.view = function(itinerary) {
        $scope.current = itinerary;
        $ionicModal.fromTemplateUrl('itineraryView.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.itineraryView = modal;
            $scope.itineraryView.show();
        });
    };
    $scope.addActivity = function() {
        $ionicModal.fromTemplateUrl('activityAdd.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.activityAdd = modal;
            $scope.activityAdd.show();
        });
    };
    $scope.addActivityconfirm = function(activity) {
        Itineraries.additem($scope.current, activity);
        $scope.activityAdd.hide();
    };
    $scope.removeitem = function(activity) {
        Itineraries.removeitem($scope.current, activity);
    };
    $scope.edititem = function(activity) {
        $scope.currentitem = activity;
        $ionicModal.fromTemplateUrl('activityEdit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.activityEdit = modal;
            $scope.activityEdit.show();
        });
    };
    $scope.editActivityconfirm = function(editted) {
        Itineraries.edititem($scope.currentitem, editted);
        $scope.activityEdit.hide();
    };
    $scope.notification = function(item) {
        $scope.currentitem = item;
        $ionicModal.fromTemplateUrl('notification.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.notification = modal;
            $scope.notification.show();
        });
    };
    $scope.notificationconfirm = function(notification) {
        Itineraries.addNotification($scope.currentitem, notification);
        $scope.notification.hide();
    };
    $scope.editnotification = function() {
        $ionicModal.fromTemplateUrl('editnotification.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.editnotification = modal;
            $scope.editnotification.show();
        });
    };
})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
