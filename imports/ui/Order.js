import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Orders } from '../api/index.js';

export default class Order extends Component {

    deleteThisOrder() {
        Meteor.call('orders.remove', this.props.order._id);
    }

    render() {
        return (
            <li>
                <button className="delete" onClick={this.deleteThisOrder.bind(this)}> &times;</button>
                <span className="text">Client: {this.props.order.client}</span>
                <span className="text">Good: {this.props.order.good}</span>
                <span className="text">Units: {this.props.order.units}</span>
            </li>
        );
    }
}
