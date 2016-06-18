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
                remarks: 'Bring trunks',
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
                    to: itinerary.to
                });
            },
            additem: function(itinerary, activitytoadd) {
                itinerary.items.push({
                    date: activitytoadd.date,
                    activity: activitytoadd.activity,
                    remarks: activitytoadd.remarks
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
                if(editted.activity !== undefined && editted,activity !== '') {
                    activity.activity = editted.activity;
                }
                if(editted.remarks !== undefined && editted.remarks !== '') {
                    activity.remarks = editted.remarks;
                }
                if (editted.date !== undefined && editted.date !== null) {
                    activity.date = editted.date;
                }
            }
        };
    })
   
    .factory('Budgets', function() {
        var budgets = [{
            name: 'Entry 1',
            items: [{
                itemName: 'dinner',
                date: new Date('25 Jun 2015 16:30:00 GMT+0800'),
                price: 222
            }]
        }];
        
        return{
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
                });
            },
            addItem: function(budget, item) {
                budget.items.push({
                    itemName: item.itemName,
                    date: item.date,
                    price: item.price
                });
            },
            
            edit: function(budget, newBudget) {
                if (newBudget.name !== undefined && newBudget.name !== '') {
                    budget.name = newBudget.name;
                }
                
            },
            //what's "activity" over here? from code above
            editItem: function(activity, editted) {
                if(editted.itemName !== undefined && editted.itemName !== '') {
                    activity.itemName = editted.itemName;
                }
                if(editted.price !== undefined && editted.price !== '') {
                    activity.price = editted.price;
                }
                if (editted.date !== undefined && editted.date !== null) {
                    activity.date = editted.date;
                }
            }
        };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    });
