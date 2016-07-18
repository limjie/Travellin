angular.module('starter.controllers', [])

.controller('ItineraryCtrl', function($scope, $ionicModal, Itineraries, $ionicListDelegate, Budgets, localStorageService, $cordovaLocalNotification) {
    $scope.fetchItinerary = function () {
        $scope.itineraries = Itineraries.all();
    };
    $scope.notisetting = {
        checked: false
    };
    $scope.counter = 0;
    $scope.fetchItinerary = function() {
        $scope.itineraries = Itineraries.all();
    };
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
        $ionicListDelegate.closeOptionButtons();
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
        $scope.notisetting.checked = false;
        $ionicModal.fromTemplateUrl('activityAdd.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.activityAdd = modal;
            $scope.activityAdd.show();
        });
    };
    $scope.addActivityconfirm = function(activity) {
        $scope.counter++;
        Itineraries.additem($scope.current, activity, $scope.counter, $scope.notisetting.checked, $scope.message, $scope.datetime);
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
        $ionicListDelegate.closeOptionButtons();
    };
    $scope.editActivityconfirm = function(editted, boo) {
        if (editted !== undefined) {
            Itineraries.edititem($scope.currentitem, editted, boo);
        }
        $scope.activityEdit.hide();
    };
    $scope.notify = function() {
        if ($scope.notisetting.checked) {
            $ionicModal.fromTemplateUrl('notification.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.notification = modal;
                $scope.notification.show();
            });
        } else {
            $cordovaLocalNotification.cancel($scope.counter + 1);
        }
    };
    $scope.notificationconfirm = function(notification) {
        if (notification.message !== undefined && notification.message !== '') {
            $scope.message = notification.message;
        }
        if (notification.date !== undefined && notification.date !== null) {
            $scope.datetime = notification.date;
        }
        $cordovaLocalNotification.schedule({
            id: $scope.counter + 1,
            text: notification.message,
            at: notification.date
        });
        $scope.notification.hide();
    };
    $scope.editnotify = function(boo) {
        if (boo) {
            $ionicModal.fromTemplateUrl('editnotification.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.editnotification = modal;
                $scope.editnotification.show();
            });
        } else {
            $cordovaLocalNotification.cancel($scope.currentitem.id);
        }
    };
    $scope.editnotificationconfirm = function(notification) {
        $cordovaLocalNotification.cancel($scope.currentitem.id);
        $cordovaLocalNotification.schedule({
            id: $scope.currentitem.id,
            text: (notification.message !== undefined && notification.message !== '') ? notification.message : $scope.currentitem.notification.message,
            at: (notification.date !== undefined && notification.date !== null) ? notification.date : $scope.currentitem.notification.date
        });
        $scope.editnotification.hide();
    };
})

.controller('ConverterCtrl', function($scope, $http) {
    $scope.x = {
        currency: "USD",
        value: "0"
    };
    $scope.a = {
        currency: "SGD",
        value: "0"
    };
    $scope.y = '0';
    $scope.opp = false;
    $scope.startnew = true;
    $scope.operation = null;
    $scope.input = function(z) {
        if ($scope.startnew && z !== '.') {
            $scope.x.value = z;
            $scope.startnew = false;
            $scope.a.value = '0';
        } else {
            $scope.x.value += z;
            $scope.startnew = false;
        }
    };
    $scope.clear = function() {
        $scope.x.value = '0';
        $scope.y = '0';
        $scope.a.value = '0';
        $scope.opp = false;
        $scope.startnew = true;
    };
    $scope.backspace = function() {
        if ($scope.x.value.substring($scope.x.value.length - 1) === '.') {
            $scope.x.value = $scope.x.value.slice(0, -2);
        } else {
            $scope.x.value = $scope.x.value.slice(0, -1);
        }
    };
    $scope.op = function(op) {
        if ($scope.opp) {
            $scope.equal();
        }
        $scope.opp = true;
        $scope.y = $scope.x.value;
        $scope.startnew = true;
        $scope.operation = op;
    };
    $scope.equal = function() {
        if ($scope.opp) {
            if ($scope.operation === 'add') {
                $scope.x.value = String(parseFloat($scope.x.value) + parseFloat($scope.y));
            } else if ($scope.operation === 'minus') {
                $scope.x.value = String(parseFloat($scope.y) - parseFloat($scope.x.value));
            } else {
                $scope.x.value = String(parseFloat($scope.x.value) * parseFloat($scope.y));
            }
            $scope.y = 0;
            $scope.opp = false;
        }
        $scope.startnew = true;
    };
    $scope.convert = function() {
        var con = $scope.x.currency.concat($scope.a.currency);
        $scope.equal();
        $http.get("http://apilayer.net/api/live?access_key=8e7946018bea837c863dde007e43baa7").success(function(data) {
            if ($scope.x.currency === "USD") {
                $scope.a.value = ($scope.x.value * data.quotes[con]).toFixed(2);
            } else if ($scope.a.currency === "USD") {
                con = $scope.a.currency.concat($scope.x.currency);
                $scope.a.value = ($scope.x.value * (1 / data.quotes[con])).toFixed(2);
            } else {
                con = "USD".concat($scope.x.currency);
                var temp = $scope.x.value * (1 / data.quotes[con]);
                con = "USD".concat($scope.a.currency);
                $scope.a.value = (temp * data.quotes[con]).toFixed(2);
            }
        });
        $scope.startnew = true;
    };
})

.controller('BudgetCtrl', function($scope, $ionicModal, Budgets, $ionicListDelegate, localStorageService) {
    $scope.fetchBudget = function() {
        $scope.budgets = Budgets.all();
        if(localStorageService.get("chartData")) {
            $scope.counts = localStorageService.get("chartData");
        } else {
            $scope.counts = [0, 0, 0, 0, 0];
        }
    };
    $scope.countLabels = ["Food", "Accomodation", "Transport", "Shopping", "Others"];
    $scope.chart = function(budget) {
        $ionicModal.fromTemplateUrl('budgetChart.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.budgetChart = modal;
            $scope.budgetChart.show();
        });
    };

    $scope.totalAmount = 0;
    $scope.order = 'date';
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
        localStorageService.set("budgetData", budgets);
    };
    $scope.addBudgetconfirm = function(budget) {
        Budgets.add(budget);
        $scope.budgetAdd.hide();
        localStorageService.set("budgetData", budgets);
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
        $ionicListDelegate.closeOptionButtons();
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
        localStorageService.set("budgetData", budgets);
    };
    $scope.addBudgetItemToChart = function(budgetItem) {
        if(budgetItem.category == "Food") {
            $scope.counts[0] += budgetItem.price;
        } else if(budgetItem.category == "Accomodation") {
            $scope.counts[1] += budgetItem.price;
        } else if(budgetItem.category == "Transport") {
            $scope.counts[2] += budgetItem.price;
        } else if(budgetItem.category == "Shopping") {
            $scope.counts[3] += budgetItem.price;
        } else if(budgetItem.category == "Others") {
            $scope.counts[4] += budgetItem.price;
        }
    };
    $scope.editBudgetItemToChart = function(currentItem, edittedItem) {
        if(edittedItem.price !== null) {
            if(currentItem.category == "Food") {
                $scope.counts[0] -= currentItem.price;
                $scope.counts[0] += edittedItem.price;
            } else if(currentItem.category == "Accomodation") {
                $scope.counts[1] -= currentItem.price;
                $scope.counts[1] += edittedItem.price;
            } else if(currentItem.category == "Transport") {
                $scope.counts[2] -= currentItem.price;
                $scope.counts[2] += edittedItem.price;
            } else if(currentItem.category == "Shopping") {
                $scope.counts[3] -= currentItem.price;
                $scope.counts[3] += edittedItem.price;
            } else if(currentItem.category == "Others") {
               $scope.counts[4] -= currentItem.price;
                $scope.counts[4] += edittedItem.price;
            }
            localStorageService.set("chartData", $scope.counts);
        }    
    };
    $scope.removeBudgetItemToChart = function(budgetItem) {
        if(budgetItem.category == "Food") {
            $scope.counts[0] -= budgetItem.price;
        } else if(budgetItem.category == "Accomodation") {
            $scope.counts[1] -= budgetItem.price;
        } else if(budgetItem.category == "Transport") {
            $scope.counts[2] -= budgetItem.price;
        } else if(budgetItem.category == "Shopping") {
            $scope.counts[3] -= budgetItem.price;
        } else if(budgetItem.category == "Others") {
            $scope.counts[4] -= budgetItem.price;
        }        
    };
    $scope.addBudgetItemconfirm = function(budgetItem) {
        $scope.addBudgetItemToChart(budgetItem);
        Budgets.addItem($scope.current, budgetItem);
        $scope.getTotal($scope.current);
        $scope.budgetItemAdd.hide();
        localStorageService.set("chartData", $scope.counts);
        localStorageService.set("budgetData", budgets);
    };
    $scope.removeItem = function(budgetItem) {
        $scope.removeBudgetItemToChart(budgetItem);
        Budgets.removeItem($scope.current, budgetItem);
        $scope.getTotal($scope.current);
        localStorageService.set("chartData", $scope.counts);
        localStorageService.set("budgetData", budgets);
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
        $ionicListDelegate.closeOptionButtons();
    };
    $scope.editBudgetItemconfirm = function(editted) {
        Budgets.editItem($scope.currentItem, editted);
        $scope.getTotal($scope.current);
        $scope.budgetItemEdit.hide();
        $ionicListDelegate.closeOptionButtons();
    };
})

.controller('SettingCtrl', function($scope, localStorageService) {
    $scope.setting = {
        twentyfourhour: true,
        notification: true
    };
    $scope.clearAll = function() {
        localStorageService.clearAll();
    }
});
