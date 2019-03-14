import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Clients } from '../api/index.js';

export default class Client extends Component {


    deleteThisClient() {

        Meteor.call('clients.remove', this.props.client._id);

    }

    render() {
        return (
            <li>
                <button className="delete" onClick={this.deleteThisClient.bind(this)}> &times;</button>
                <span className="text">{this.props.client.text}</span>
            </li>
        );
    }
}
