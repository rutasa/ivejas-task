import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Goods } from '../api/index.js';

export default class Good extends Component {


    deleteThisGood() {
        Meteor.call('goods.remove', this.props.good._id);
    }

    render() {
        return (
            <li>
                <button className="delete" onClick={this.deleteThisGood.bind(this)}> &times;</button>
                <span className="text">{this.props.good.text}</span>
            </li>
        );
    }
}
