'use strict';
var rq = require("request-promise");
const private_api = require("../../config/private_api.json");
var Order = require("../models/order");


module.exports = class OrderRepo {
    constructor() { };
    getAll() {
        let order = new Order();

        let method = "orderRepo/getAll";
        console.log(method);

        const options = {
            method: 'GET',
            uri: private_api.api_ip + ':' + private_api.api_port + private_api.api_url + order.$class,
            json: true
        };

        return rq(options)
            .then(data => {
                console.log(method + " -->success");
                return JSON.parse(JSON.stringify(data));
            })
            .catch(err => {
                console.log(method + " -->failed");
                return console.log(err);
            });

    };

    insert(_order) {
        let order = _order;

        let method = "orderRepo/insert/orderNumber: " + order.orderNumber;
        console.log(method);

        const options = {
            method: "POST",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + order.$class,
            body: {
                "$class": (order.$class),
                "orderNumber": order.orderNumber,
                "items": order.items,
                "status": order.status,
                "dispute": order.dispute,
                "resolve": order.resolve,
                "backorder": order.backorder,
                "refund": order.refund,
                "amount": order.amount,
                "created": order.created,
                "bought": order.bought,
                "cancelled": order.cancelled,
                "ordered": order.ordered,
                "dateBackordered": order.dateBackordered,
                "requestShipment": order.requestShipment,
                "delivered": order.delivered,
                "delivering": order.delivering,
                "disputeOpened": order.disputeOpened,
                "disputeResolved": order.disputeResolved,
                "paymentRequested": order.paymentRequested,
                "orderRefunded": order.orderRefunded,
                "approved": order.approved,
                "paid": order.paid,
                "provider": order.provider,
                "shipper": order.shipper,
                "buyer": order.buyer,
                "seller": order.seller,
                "financeCo": order.financeCo
            },
            json: true
        };

        return rq(options)
            .then(data => {
                console.log(method + " success!!!");
                return JSON.parse(JSON.stringify(data));
            })
            .catch(error => {
                console.log(method + " failed!!!");
                return ({ 'result': "failed", 'error': "insert method failed: " + error.message });
            });
    };

    getByID(_orderNumber) {
        let order = new Order();
        order.orderNumber = _orderNumber;

        let result;

        let method = "orderRepo/getByID/orderID: " + order.orderNumber;
        console.log(method);


        const options = {
            method: "GET",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + order.$class + "/" + order.orderNumber,
            json: true
        };

        return rq(options)
            .then(data => {
                console.log(method + "-->success");
                result = JSON.parse(JSON.stringify(data));
                return result;
            })
            .catch(err => {
                console.log(method + " -->failed");
                return console.log(err);
            });
    };

    update(_updateOrder) {
        let order = new Order();
        order = _updateOrder;

        let method = "orderRepo/update/orderNumber: " + order.orderNumber;
        console.log(JSON.stringify(order));

        const options = {
            method: "PUT",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + order.$class + "/" + order.orderNumber,
            body: {
                "$class": order.$class,
                "orderNumber": order.orderNumber,
                "items": order.items,
                "status": order.status,
                "dispute": order.dispute,
                "resolve": order.resolve,
                "backorder": order.backorder,
                "refund": order.refund,
                "amount": order.amount,
                "created": order.created,
                "bought": order.bought,
                "cancelled": order.cancelled,
                "ordered": order.ordered,
                "dateBackordered": order.dateBackordered,
                "requestShipment": order.requestShipment,
                "delivered": order.delivered,
                "delivering": order.delivering,
                "disputeOpened": order.disputeOpened,
                "disputeResolved": order.disputeResolved,
                "paymentRequested": order.paymentRequested,
                "orderRefunded": order.orderRefunded,
                "approved": order.approved,
                "paid": order.paid,
                "provider": order.provider,
                "shipper": order.shipper,
                "buyer": order.buyer,
                "seller": order.seller,
                "financeCo": order.financeCo
            },
            json: true
        };
        return rq(options)
            .then(result => {
                console.log(method + " -->success!!!");
                return result;
            })
            .catch(error => {
                console.log(method + " -->failed!!!");
                return ({ 'result': "failed", 'error': "insert method failed: " + error.message });
            });
    };

    delete(_orderNumber) {
        let order = new Order();
        order.orderNumber = _orderNumber;

        let method = "orderRepo/Delete/orderID: " + order.orderNumber;
        console.log(method);


        const options = {
            method: "DELETE",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + order.$class + "/" + order.orderNumber,
            json: true
        };

        return rq(options)
            .then(data => {
                console.log(method + "-->success");

                return data;
            })
            .catch(err => {
                console.log(method + " -->failed");
                return console.log(err);
            });
    };
    
}