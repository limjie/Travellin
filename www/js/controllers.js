angular.module('starter.controllers', [])

.controller('ItineraryCtrl', function($scope, $ionicModal, Itineraries, $ionicListDelegate, Budgets, localStorageService, $cordovaLocalNotification) {
    $scope.fetchItinerary = function() {
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
            at: notification.date,
            icon: "../img/icon.png",
            smallIcon: "../img/icon.png"
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
            at: (notification.date !== undefined && notification.date !== null) ? notification.date : $scope.currentitem.notification.date,
            icon: "../img/icon.png",
            smallIcon: "../img/icon.png"
        });
        $scope.editnotification.hide();
    };
})

.controller('ConverterCtrl', function($scope, $http, localStorageService) {
    $scope.fetchCurr = function() {
        $scope.x.currency = localStorageService.get("currX");
        $scope.a.currency = localStorageService.get("currA");
    };
    $scope.x = {
        value: "0"
    };
    $scope.a = {
        value: "0"
    };
    $scope.y = '0';
    $scope.opp = false;
    $scope.startnew = true;
    $scope.operation = null;
    $scope.decimal = false;
    $scope.input = function(z) {
        if ($scope.startnew && z !== '.') {
            $scope.x.value = z;
            $scope.startnew = false;
            $scope.a.value = '0';
        } else if (z === '.') {
            if (!$scope.decimal) {
                $scope.decimal = true;
                $scope.x.value += z;
                $scope.startnew = false;
            }
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
        $scope.decimal = false;
    };
    $scope.backspace = function() {
        if ($scope.x.value.substring($scope.x.value.length - 1) === '.') {
            $scope.decimal = false;
        }
        $scope.x.value = $scope.x.value.slice(0, -1);
    };
    $scope.op = function(op) {
        if ($scope.opp) {
            $scope.equal();
        }
        $scope.opp = true;
        $scope.y = $scope.x.value;
        $scope.startnew = true;
        $scope.operation = op;
        $scope.decimal = false;
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
        $scope.decimal = false;
    };
    $scope.convert = function() {
        var con = $scope.x.currency.concat($scope.a.currency);
        $scope.equal();
        $scope.rates = undefined;
        $http.get("http://apilayer.net/api/live?access_key=8e7946018bea837c863dde007e43baa7").success(function(data) {
            $scope.rates = data;
            localStorageService.set("rates", $scope.rates);
        });
        if ($scope.rates === undefined) {
            $scope.rates = localStorageService.get("rates");
        }
        if ($scope.x.currency === "USD") {
            $scope.a.value = ($scope.x.value * $scope.rates.quotes[con]).toFixed(2);
        } else if ($scope.a.currency === "USD") {
            con = $scope.a.currency.concat($scope.x.currency);
            $scope.a.value = ($scope.x.value * (1 / $scope.rates.quotes[con])).toFixed(2);
        } else {
            con = "USD".concat($scope.x.currency);
            var temp = $scope.x.value * (1 / $scope.rates.quotes[con]);
            con = "USD".concat($scope.a.currency);
            $scope.a.value = (temp * $scope.rates.quotes[con]).toFixed(2);
        }
        $scope.startnew = true;
    };
    $scope.save = function() {
        localStorageService.set("currX", $scope.x.currency);
        localStorageService.set("currA", $scope.a.currency);
    };
})

.controller('BudgetCtrl', function($scope, $ionicModal, Budgets, $ionicListDelegate, localStorageService) {
    $scope.oldcat = undefined;
    $scope.fetchBudget = function() {
        $scope.budgets = Budgets.all();
    };

    $scope.updateChart = function() {
        $scope.arr = [$scope.current.counts[0].num, $scope.current.counts[1].num, $scope.current.counts[2].num, $scope.current.counts[3].num, $scope.current.counts[4].num];
    };
    $scope.countLabels = ["Food", "Accomodation", "Transport", "Shopping", "Others"];
    $scope.chart = function(budget) {
        $scope.updateChart();
        $ionicModal.fromTemplateUrl('budgetChart.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.budgetChart = modal;
            $scope.budgetChart.show();
        });
    };

    $scope.order = 'date';
    $scope.getTotal = function(budget) {
        $scope.current.totalAmount = Budgets.getTotal(budget);

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
    };
    $scope.addBudgetItemToChart = function(budgetItem) {
        if (budgetItem.category === "Food") {
            $scope.current.counts[0].num += budgetItem.price;
        } else if (budgetItem.category === "Accomodation") {
            $scope.current.counts[1].num += budgetItem.price;
        } else if (budgetItem.category === "Transport") {
            $scope.current.counts[2].num += budgetItem.price;
        } else if (budgetItem.category === "Shopping") {
            $scope.current.counts[3].num += budgetItem.price;
        } else if (budgetItem.category === "Others") {
            $scope.current.counts[4].num += budgetItem.price;
        }
        for (var i in $scope.counts) {
            $scope.current.counts[i].num.toPrecision(2);
        }

    };
    $scope.editBudgetItemToChart = function(edittedItem) {
        var x = 0;
        var y = 0;
        if ($scope.oldcat == "Food") {
            x = 0;
        } else if ($scope.oldcat == "Accomodation") {
            x = 1;
        } else if ($scope.oldcat == "Transport") {
            x = 2;
        } else if ($scope.oldcat == "Shopping") {
            x = 3;
        } else {
            x = 4;
        }
        if (edittedItem.category == "Food") {
            y = 0;
        } else if (edittedItem.category == "Accomodation") {
            y = 1;
        } else if (edittedItem.category == "Transport") {
            y = 2;
        } else if (edittedItem.category == "Shopping") {
            y = 3;
        } else {
            y = 4;
        }
        if (edittedItem.price === null) {
            $scope.current.counts[x].num -= $scope.currentItem.price;
            $scope.current.counts[y].num += $scope.currentItem.price;
        } else {
            $scope.current.counts[x].num -= $scope.currentItem.price;
            $scope.current.counts[y].num += edittedItem.price;
        }
    };
    $scope.removeBudgetItemToChart = function(budgetItem) {
        if (budgetItem.category === "Food") {
            $scope.current.counts[0].num -= budgetItem.price;
        } else if (budgetItem.category === "Accomodation") {
            $scope.current.counts[1].num -= budgetItem.price;
        } else if (budgetItem.category === "Transport") {
            $scope.current.counts[2].num -= budgetItem.price;
        } else if (budgetItem.category === "Shopping") {
            $scope.current.counts[3].num -= budgetItem.price;
        } else if (budgetItem.category === "Others") {
            $scope.current.counts[4].num -= budgetItem.price;
        }
    };
    $scope.addBudgetItemconfirm = function(budgetItem) {
        $scope.addBudgetItemToChart(budgetItem);
        Budgets.addItem($scope.current, budgetItem);
        $scope.getTotal($scope.current);
        $scope.budgetItemAdd.hide();
        localStorageService.set("budgetData", budgets);
    };
    $scope.removeItem = function(budgetItem) {
        $scope.removeBudgetItemToChart(budgetItem);
        Budgets.removeItem($scope.current, budgetItem);
        $scope.getTotal($scope.current);
        localStorageService.set("budgetData", budgets);
    };
    $scope.editItem = function(budgetItem) {
        $scope.currentItem = budgetItem;
        $scope.oldcat = budgetItem.category;
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
        localStorageService.set("budgetData", budgets);
    };
})

.controller('SettingCtrl', function($scope, $ionicPopup, Budgets, Itineraries, localStorageService) {
    $scope.setting = {
        //twentyfourhour: true,
        notification: true
    };
    $scope.clearAll = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete All Data',
            template: 'Are you sure you want to delete everything?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                Budgets.clearData();
                $scope.counts = [{ num: 0 }, { num: 0 }, { num: 0 }, { num: 0 }, { num: 0 }];
                Itineraries.clearData();
                localStorageService.clearAll();
            }
        });
    };
});
