angular.module('starter.controllers', [])

.controller('ItineraryCtrl', function($scope, $ionicModal, Itineraries, $ionicListDelegate, Budgets) {
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
        Budgets.addtogether(itinerary);
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
        var name = $scope.current.name;
        Itineraries.edit($scope.current, itinerary);
        Budgets.edittogether(name, itinerary);
        $scope.itineraryEdit.hide();
        $ionicListDelegate.closeOptionButtons();
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

.controller('ConverterCtrl', function($scope, $http) {
    $scope.xcurrency = 'USD';
    $scope.x = '0';
    $scope.acurrency = 'SGD';
    $scope.a = '0';
    $scope.y = '0';
    $scope.opp = false;
    $scope.startnew = true;
    $scope.operation = null;
    $scope.input = function(z) {
        if ($scope.startnew) {
            $scope.x = z;
            $scope.startnew = false;
            $scope.a = '0';
        } else {
            $scope.x += z;
        }
    };
    $scope.clear = function() {
        $scope.x = '0';
        $scope.y = '0';
        $scope.a = '0';
        $scope.opp = false;
        $scope.startnew = true;
    };
    $scope.backspace = function() {
        if ($scope.x.substring($scope.x.length - 1) === '.') {
            $scope.x = $scope.x.slice(0, -2);
        } else {
            $scope.x = $scope.x.slice(0, -1);
        }
    };
    $scope.op = function(op) {
        if ($scope.opp) {
            $scope.equal();
        }
        $scope.opp = true;
        $scope.y = $scope.x;
        $scope.startnew = true;
        $scope.operation = op;
    };
    $scope.equal = function() {
        if ($scope.opp) {
            if ($scope.operation === 'add') {
                $scope.x = String(parseFloat($scope.x) + parseFloat($scope.y));
            } else if ($scope.operation === 'minus') {
                $scope.x = String(parseFloat($scope.x) - parseFloat($scope.y));
            } else {
                $scope.x = String(parseFloat($scope.x) * parseFloat($scope.y));
            }
            $scope.y = 0;
            $scope.opp = false;
        }
        $scope.startnew = true;
    };
    $scope.convert = function() {
        $scope.equal();
        $http.get("http://apilayer.net/api/live?access_key=8e7946018bea837c863dde007e43baa7").success(function(data) {
            $scope.a = ($scope.x * data.quotes.USDSGD).toFixed(2);
        });
        $scope.startnew = true;
    };
})

.controller('BudgetCtrl', function($scope, $ionicModal, Budgets, $ionicListDelegate) {
    $scope.budgets = Budgets.all();
    $scope.totalAmount = 222;

    $scope.getTotal = function(budget) {
        $scope.totalAmount = Budgets.getTotal(budget);
    };
    $scope.remove = function(budget) {
        Budgets.remove(budget);
    };
    $scope.addBudget = function() {
        $ionicModal.fromTemplateUrl('budgetAdd.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.budgetAdd = modal;
            $scope.budgetAdd.show();
        });
    };
    $scope.addBudgetconfirm = function(budget) {
        Budgets.add(budget);
        $scope.budgetAdd.hide();
    };
    $scope.edit = function(budget) {
        $scope.current = budget;
        $ionicModal.fromTemplateUrl('budgetEdit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.budgetEdit = modal;
            $scope.budgetEdit.show();
        });
    };
    $scope.editBudget = function(budget) {
        Budgets.edit($scope.current, budget);
        $scope.budgetEdit.hide();
        $ionicListDelegate.closeOptionButtons();
    };
    $scope.view = function(budget) {
        $scope.current = budget;
        $ionicModal.fromTemplateUrl('budgetView.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.budgetView = modal;
            $scope.budgetView.show();
        });
    };
    $scope.addBudgetItem = function() {
        $ionicModal.fromTemplateUrl('budgetItemAdd.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.budgetItemAdd = modal;
            $scope.budgetItemAdd.show();
        });
    };
    $scope.addBudgetItemconfirm = function(budgetItem) {
        Budgets.addItem($scope.current, budgetItem);
        $scope.getTotal($scope.current);
        $scope.budgetItemAdd.hide();
    };
    $scope.removeItem = function(budgetItem) {
        Budgets.removeItem($scope.current, budgetItem);

    };
    $scope.editItem = function(budgetItem) {
        $scope.currentItem = budgetItem;
        $ionicModal.fromTemplateUrl('budgetItemEdit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.budgetItemEdit = modal;
            $scope.budgetItemEdit.show();
        });
    };
    $scope.editBudgetItemconfirm = function(editted) {
        Budgets.editItem($scope.currentItem, editted);
        $scope.budgetItemEdit.hide();
        $ionicListDelegate.closeOptionButtons();
    };
})

.controller('SettingCtrl', function($scope) {
    $scope.setting = {
        twentyfourhour: true,
        notification: true
    };
});
