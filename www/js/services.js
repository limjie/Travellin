angular.module('starter.services', [])
    .factory('Itineraries', function() {
        var itineraries = [{
            id: 0,
            name: 'Itinerary 1',
            country: 'Singapore',
            from: new Date('2015-06-15'),
            to: new Date('2015-07-15')
        }];
        return {
            all: function() {
                return itineraries;
            },
            remove: function(itinerary) {
                itineraries.splice(itineraries.indexOf(itinerary), 1);
            },
            get: function(id) {
                for (var i = 0; i < itineraries.length; i++) {
                    if (itineraries[i].id === parseInt(id)) {
                        return itineraries[i];
                    }
                }
                return null;
            },
            add: function(itinerary) {
                itineraries.push({
                    id: itineraries[itineraries.length - 1] + 1,
                    name: itinerary.name,
                    country: itinerary.country
                });
            },
            edit: function(itinerary, newitinerary) {
                if (newitinerary.name !== undefined && newitinerary.name !== '') {
                    itinerary.name = newitinerary.name;
                }
                if (newitinerary.country !== undefined && newitinerary.country !== '') {
                    itinerary.country = newitinerary.country;
                }
                if (newitinerary.from !== undefined && newitinerary.from !== '') {
                    itinerary.from = newitinerary.from;
                }
                if (newitinerary.to !== undefined && newitinerary.to !== '') {
                    itinerary.to = newitinerary.to;
                }
            }
        };
    })
    .factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
