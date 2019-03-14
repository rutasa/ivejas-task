import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Clients = new Mongo.Collection('clients');
export const Orders = new Mongo.Collection('orders');
export const Goods = new Mongo.Collection('goods');

Meteor.methods({

    'clients.insert'(text) {

        check(text, String);

        if (! this.userId) {

            throw new Meteor.Error('not-authorized');

        }



        Clients.insert({

            text,

            createdAt: new Date(),

            owner: this.userId,

            username: Meteor.users.findOne(this.userId).username,

        });

    },

    'orders.insert'(client, good, units) {

        check(client, String);
        check(good, String);
        check(units, Number);

        if (! this.userId) {

            throw new Meteor.Error('not-authorized');

        }



        Orders.insert({

            client,

            good,

            units,

            createdAt: new Date(),

            owner: this.userId,

            username: Meteor.users.findOne(this.userId).username,

        });

    },

    'goods.insert'(text) {

        check(text, String);

        if (! this.userId) {

            throw new Meteor.Error('not-authorized');

        }

        Goods.insert({

            text,

            createdAt: new Date(),

            owner: this.userId,

            username: Meteor.users.findOne(this.userId).username,

        });

    },

    'clients.remove'(clientId) {

        check(clientId, String);
        Clients.remove(clientId);

    },

    'orders.remove'(orderId) {

        check(orderId, String);
        Orders.remove(orderId);

    },

    'goods.remove'(goodId) {

        check(goodId, String);
        Goods.remove(goodId);

    },

});
