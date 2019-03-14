import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Client from './Client';
import Order from './Order';
import Good from './Good';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Index, Clients, Orders, Goods } from '../api/index.js';


class App extends Component {

    handleSubmitClients(event) {

        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInputClient).value.trim();

        Meteor.call('clients.insert', text);

        ReactDOM.findDOMNode(this.refs.textInputClient).value = '';

    }

    handleSubmitOrders(event) {

        event.preventDefault();

        const orderClient = ReactDOM.findDOMNode(this.refs.textInputOrderClient).value.trim();
        const orderGood = ReactDOM.findDOMNode(this.refs.textInputOrderGood).value.trim();
        const orderUnits = parseInt(ReactDOM.findDOMNode(this.refs.textInputOrderUnits).value);

        Meteor.call('orders.insert', orderClient, orderGood, orderUnits);

        ReactDOM.findDOMNode(this.refs.textInputOrderClient).value = '';
        ReactDOM.findDOMNode(this.refs.textInputOrderGood).value = '';
        ReactDOM.findDOMNode(this.refs.textInputOrderUnits).value = '';

    }

    handleSubmitGoods(event) {

        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInputGood).value.trim();

        Meteor.call('goods.insert', text);

        ReactDOM.findDOMNode(this.refs.textInputGood).value = '';

    }

    renderClients() {
        return this.props.clients.map((client) => (
            <Client key={client._id} client={client} />
         ));
    }

    renderOrders() {
        return this.props.orders.map((order) => (
            <Order key={order._id} order={order} />
    ));
    }

    renderGoods() {
        return this.props.goods.map((good) => (
            <Good key={good._id} good={good} />
    ));
    }

    render() {

        return (
            <div className="container">
                <header>
                    <h1>Clients, Orders and Goods</h1>
                </header>
                <AccountsUIWrapper />
                <h1>Clients</h1>
                { this.props.currentUser ? <form className="new-form" onSubmit={this.handleSubmitClients.bind(this)} >
                    <span>Client:</span><input type="text" ref="textInputClient" placeholder="Type to add new client" />
                    <input type="submit" value="Save client" />
                </form> : ''
                }
                <ul> {this.renderClients()} </ul><br />
                <h1>Orders</h1>
                { this.props.currentUser ? <form className="new-form" onSubmit={this.handleSubmitOrders.bind(this)} >
                    <span>Client:</span> <input type="text" ref="textInputOrderClient" placeholder="Type to add order client" />
                    <span>Good: </span><input type="text" ref="textInputOrderGood" placeholder="Type to add order good" />
                    <span>Units:</span> <input type="number" ref="textInputOrderUnits" placeholder="Type to add order units" />
                    <input type="submit" value="Save order" />
                </form> : ''
                }
                <ul> {this.renderOrders()} </ul><br />
                <h1>Goods</h1>
                { this.props.currentUser ? <form className="new-form" onSubmit={this.handleSubmitGoods.bind(this)} >
                 <span>Good: </span><input type="text" ref="textInputGood" placeholder="Type to add new good" />
                <input type="submit" value="Save good" />
                </form> : ''
                }
                <ul> {this.renderGoods()} </ul><br />
            </div>
        );
    }
}

export default withTracker(() => {

    return {
        clients: Clients.find({}, { sort: { createdAt: -1 } }).fetch(),
        orders: Orders.find({}, { sort: { createdAt: -1 } }).fetch(),
        goods: Goods.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };

})(App);
