angular.module('starter.services', [])
    .factory('Itineraries', function(localStorageService) {
        var itineraries = [ /*
            {
            name: 'Itinerary 1',
            country: 'Singapore',
            from: new Date('15 Jun 2015'),
            to: new Date('15 Jul 2015'),
            items: [{
                id: 0,
                date: new Date('25 Jun 2015 16:30:00 GMT+0800'),
                activity: 'Swimming',
                remarks: 'Bring swimmming trunks',
                notification: true }
            } ]
        } */];
        if (localStorageService.get("itineraryData")){
            itineraries = localStorageService.get("itineraryData");
        } 
        return {
            all: function() {
                for(var i in itineraries){
                    itineraries[i].from = new Date(itineraries[i].from);
                    itineraries[i].to = new Date(itineraries[i].to);
                    for (var j in itineraries[i].items) {
                        itineraries[i].items[j].date = new Date(itineraries[i].items[j].date);
                        itineraries[i].items[j].time = new Date(itineraries[i].items[j].time);
                    }
                }
                return itineraries;   
            },
            clearData: function() {
                itineraries.length = 0;
            },
            remove: function(itinerary) {
                itineraries.splice(itineraries.indexOf(itinerary), 1);
                localStorageService.set("itineraryData", itineraries);
            },
            removeitem: function(itinerary, activity) {
                itinerary.items.splice(itinerary.items.indexOf(activity), 1);
                localStorageService.set("itineraryData", itineraries);
            },
            add: function(itinerary) {
                itineraries.push({
                    name: itinerary.name,
                    country: itinerary.country,
                    from: itinerary.from,
                    to: itinerary.to,
                    items: []
                });
                localStorageService.set("itineraryData", itineraries);
            },
            additem: function(itinerary, activitytoadd, counter, notisetting, notimessage, datetime) {
                itinerary.items.push({
                    id: counter,
                    date: new Date(activitytoadd.date.getFullYear() + "-" + (activitytoadd.date.getMonth()+1) + "-" + activitytoadd.date.getDate() + " " + activitytoadd.time.getHours() + ":" + activitytoadd.time.getMinutes() + ":" + activitytoadd.time.getSeconds()),
                    activity: activitytoadd.activity,
                    remarks: activitytoadd.remarks,
                    time: activitytoadd.time,
                    notification: {
                        checked: notisetting,
                        message: notimessage,
                        date: datetime
                    }
                });
                localStorageService.set("itineraryData", itineraries);
            },
            edit: function(itinerary, newitinerary) {
                if (newitinerary.name !== undefined && newitinerary.name !== '') {
                    itinerary.name = newitinerary.name;
                }
                if (newitinerary.country !== undefined && newitinerary.country !== '') {
                    itinerary.country = newitinerary.country;
                }
                if (newitinerary.from !== undefined && newitinerary.from !== null) {
                    itinerary.from = newitinerary.from;
                }
                if (newitinerary.to !== undefined && newitinerary.to !== null) {
                    itinerary.to = newitinerary.to;
                }
                localStorageService.set("itineraryData", itineraries);
            },
            addNotification: function(activity, notificationtoadd) {
                activity.notification = { set: true, message: notificationtoadd.message, time: notificationtoadd.time };
                localStorageService.set(itineraryData, itineraries);
            },
            edititem: function(activity, editted, boo) {
                if (editted.activity !== undefined && editted.activity !== '') {
                    activity.activity = editted.activity;
                }
                if (editted.remarks !== undefined && editted.remarks !== '') {
                    activity.remarks = editted.remarks;
                }
                if (editted.date !== undefined && editted.date !== null) {
                    if (editted.time !== undefined && editted.time !== null) {
                        activity.date = new Date(editted.date.getFullYear(), editted.date.getMonth(), editted.date.getDate(), editted.time.getHours(), editted.time.getMinutes(), editted.time.getSeconds());
                    } else {
                        activity.date = new Date(editted.date.getFullYear(), editted.date.getMonth(), editted.date.getDate(), activity.date.getHours(), activity.date.getMinutes(), activity.date.getSeconds());
                    }
                } else if (editted.time !== undefined && editted.time !== null) {
                    activity.date = new Date(activity.date.getFullYear(), activity.date.getMonth(), activity.date.getDate(), editted.time.getHours(), editted.time.getMinutes(), editted.time.getSeconds());
                }
                activity.notification.checked = boo;
                localStorageService.set("itineraryData", itineraries);
            }
        };
    })

.factory('Budgets', function(localStorageService) {
    var budgets = [ /*{
        name: 'Itinerary 1',
        amount: 5000,
        items: [{
            itemName: 'budget entry 1',
            date: new Date('25 Jun 2015 16:30:00 GMT+0800'),
            time: new Date('25 Jun 2015 16:30:00 GMT+0800'),
            price: 222,
            category: Shopping
        }, {
            itemName: 'budget entry 2',
            date: new Date('25 Jun 2015 17:30:00 GMT+0800'),
            time: new Date('25 Jun 2015 17:30:00 GMT+0800'),
            price: 333,
            catgeory: Food
        }]
    } */];

    if (localStorageService.get("budgetData")) {
        budgets = localStorageService.get("budgetData");
    }
    return {
        getTotal: function(budget) {
            var sum = 0;
            for (var i = budget.items.length - 1; i >= 0; i--) {
                sum += budget.items[i].price;
            }
            localStorageService.set("totalAmount", sum);
            return sum;

        },
        clearData: function() {
            budgets.length = 0;
        },
        all: function() {
            for(var i in budgets) {
                for(var j in budgets[i].items){
                    budgets[i].items[j].date = new Date(budgets[i].items[j].date);
                }
            }
            return budgets;
        },
        remove: function(budget) {
            budgets.splice(budgets.indexOf(budget), 1);
            localStorageService.set("budgetData", budgets);
        },
        removeItem: function(budgets, item) {
            budgets.items.splice(budgets.items.indexOf(item), 1);
            localStorageService.set("budgetData", budgets);
        },
        add: function(budget) {
            budgets.push({
                name: budget.name,
                amount: budget.amount,
                items: []
            });
            localStorageService.set("budgetData", budgets);
        },
        addtogether: function(itinerary) {
            budgets.push({
                name: itinerary.name,
                amount: 0,
                items: []
            });
            localStorageService.set("budgetData", budgets);
        },
        addItem: function(budget, item) {
            budget.items.push({
                itemName: item.itemName,
                date: new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate(), item.time.getHours(), item.time.getMinutes(), item.time.getSeconds()),
                price: (item.price === undefined) ? 0 : item.price,
                category: item.category
            });
            localStorageService.set("budgetData", budgets);
        },
        edit: function(budget, newBudget) {
            if (newBudget.name !== undefined && newBudget.name !== '') {
                budget.name = newBudget.name;
            }
            if (newBudget.amount !== undefined && newBudget.amount !== '') {
                budget.amount = newBudget.amount;
            }
            localStorageService.set("budgetData", budgets);
        },
        edittogether: function(name, newitinerary) {
            for (var i = budgets.length - 1; i >= 0; i--) {
                if (budgets[i].name == name) {
                    budgets[i].name = newitinerary.name;
                }
            }
            localStorageService.set("budgetData", budgets);
        },
        //what's "activity" over here? from code above
        editItem: function(activity, editted) {
            if (editted.itemName !== undefined && editted.itemName !== '') {
                activity.itemName = editted.itemName;
            }
            if (editted.price !== undefined && editted.price !== '') {
                activity.price = parseFloat(editted.price);
            }
            if (editted.date !== undefined && editted.date !== null) {
                if (editted.time !== undefined && editted.time !== null) {
                    activity.date = new Date(editted.date.getFullYear(), editted.date.getMonth(), editted.date.getDate(), editted.time.getHours(), editted.time.getMinutes(), editted.time.getSeconds());
                } else {
                    activity.date = new Date(editted.date.getFullYear(), editted.date.getMonth(), editted.date.getDate(), activity.date.getHours(), activity.date.getMinutes(), activity.date.getSeconds());
                }
            } else if (editted.time !== undefined && editted.time !== null) {
                activity.date = new Date(activity.date.getFullYear(), activity.date.getMonth(), activity.date.getDate(), editted.time.getHours(), editted.time.getMinutes(), editted.time.getSeconds());
            }
            if (editted.category !== undefined && editted.category!== null) {
                activity.category = editted.category;
            }
            localStorageService.set("budgetData", budgets);
        }
    };
});
