angular.module('starter.services', [])
    .factory('Itineraries', function() {
        var itineraries = [{
            name: 'Itinerary 1',
            country: 'Singapore',
            from: new Date('15 Jun 2015'),
            to: new Date('15 Jul 2015'),
            items: [{
                date: new Date('25 Jun 2015 16:30:00 GMT+0800'),
                activity: 'Swimming',
                remarks: 'Bring swimmming trunks',
                notification: { set: true, message: 'Wake up!', time: new Date('25 Jun 2015 14:30:00 GMT+0800') }
            }]
        }];
        return {
            all: function() {
                return itineraries;
            },
            remove: function(itinerary) {
                itineraries.splice(itineraries.indexOf(itinerary), 1);
            },
            removeitem: function(itinerary, activity) {
                itinerary.items.splice(itinerary.items.indexOf(activity), 1);
            },
            add: function(itinerary) {
                itineraries.push({
                    name: itinerary.name,
                    country: itinerary.country,
                    from: itinerary.from,
                    to: itinerary.to,
                    items: []
                });
            },
            additem: function(itinerary, activitytoadd) {
                itinerary.items.push({
                    date: new Date(activitytoadd.date.getFullYear(), activitytoadd.date.getMonth(), activitytoadd.date.getDate(), activitytoadd.time.getHours(), activitytoadd.time.getMinutes(), activitytoadd.time.getSeconds()),
                    activity: activitytoadd.activity,
                    remarks: activitytoadd.remarks,
                    time: activitytoadd.time
                });
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
            },
            addNotification: function(activity, notificationtoadd) {
                activity.notification = { set: true, message: notificationtoadd.message, time: notificationtoadd.time };
            },
            edititem: function(activity, editted) {
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
            }
        };
    })

.factory('Budgets', function() {
    var budgets = [{
        name: 'Itinerary 1',
        amount: 5000,
        items: [{
            itemName: 'budget entry 1',
            date: new Date('25 Jun 2015 16:30:00 GMT+0800'),
            time: new Date('25 Jun 2015 16:30:00 GMT+0800'),
            price: 222
        }, {
            itemName: 'budget entry 2',
            date: new Date('25 Jun 2015 17:30:00 GMT+0800'),
            time: new Date('25 Jun 2015 17:30:00 GMT+0800'),
            price: 333
        }]
    }];
    return {
        getTotal: function(budget) {
            var sum = 0;
            for (var i = budget.items.length - 1; i >= 0; i--) {
                sum += budget.items[i].price;
            }
            return sum;
        },
        all: function() {
            return budgets;
        },
        remove: function(budget) {
            budgets.splice(budgets.indexOf(budget), 1);
        },
        removeItem: function(budgets, item) {
            budgets.items.splice(budgets.items.indexOf(item), 1);
        },
        add: function(budget) {
            budgets.push({
                name: budget.name,
                amount: budget.amount,
                items: []
            });
        },
        addtogether: function(itinerary) {
            budgets.push({
                name: itinerary.name,
                amount: 0,
                items: []
            });
        },
        addItem: function(budget, item) {
            budget.items.push({
                itemName: item.itemName,
                date: new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate(), item.time.getHours(), item.time.getMinutes(), item.time.getSeconds()),
                price: (item.price === undefined) ? 0 : item.price
            });
        },
        edit: function(budget, newBudget) {
            if (newBudget.name !== undefined && newBudget.name !== '') {
                budget.name = newBudget.name;
            }
            if (newBudget.amount !== undefined && newBudget.amount !== '') {
                budget.amount = newBudget.amount;
            }
        },
        edittogether: function(name, newitinerary) {
            for (var i = budgets.length - 1; i >= 0; i--) {
                if (budgets[i].name == name) {
                    budgets[i].name = newitinerary.name;
                }
            }
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
        }
    };
});
