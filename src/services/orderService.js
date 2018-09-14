'use strict';
let fs = require('fs');
let path = require('path');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
var OrderRepo=require("../repositories/orderRepo");
var Order=require("../models/order");


/** */
var orderRepo=new OrderRepo();

module.exports=class orderService{
    constructor(){};
    getAll(req,res){        
        let method="orderService/getAll";
        console.log(method);

        orderRepo.getAll()
        .then(data=>{
            console.log(method + " -->success");
            return res.json(data);
        })
        .catch(err=>{
            console.log(method + " -->failed: " + err.message);
            res.sendStatus(500).json({"result":"failed","error":+err.message});});

    };

    insert(req, res) {
        let method = "orderService/insert";
        console.log(method);

        let order = (new Order().setBuyer(req.body.buyer));   
        order.items=req.body.items;
        order.status=req.body.status;
        order.dispute=req.body.dispute;
        order.resolve=req.body.resolve;
        order.backorder=req.body.backorder;
        order.refund=req.body.refund;
        order.amount=req.body.amount;
        order.created=req.body.created;
        order.bought=req.body.bought;
        order.cancelled=req.body.cancelled;
        order.ordered=req.body.ordered;
        order.dateBackordered=req.body.dateBackordered;
        order.requestShipment=req.body.requestShipment;
        order.delivered=req.body.delivered;
        order.delivering=req.body.delivering;
        order.disputeOpened=req.body.disputeOpened;
        order.disputeResolved=req.body.disputeResolved;
        order.paymentRequested=req.body.paymentRequested;
        order.orderRefunded=req.body.orderRefunded;
        order.approved=req.body.approved;
        order.paid=req.body.paid;
        order.provider=req.body.provider;
        order.shipper=req.body.shipper;
        order.seller=req.body.seller;
        order.financeCo=req.body.financeCo;

        

        orderRepo.insert(order)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };
    
    getByID(req,res){
        let method = "orderService/getByID";
        console.log(method);

        orderRepo.getByID(req.params.orderNumber)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };
    
    update(req,res){
        let method = "orderService/update";
        console.log(method);

        let order = new Order();
        order = req.body;
        order.orderNumber = req.params.orderNumber;

        orderRepo.update(order)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };
    
    delete(req,res){
        let method = "orderService/Delete";
        console.log(method);

        orderRepo.delete(req.params.orderNumber)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };

    getOrderByUserID(req, res, next) {
        let method = 'orderService/getOrderByUserID';

        console.log(method + ' req.params.userID is: ' + req.params.userID);
        let allOrders = new Array();
        let businessNetworkConnection;

        let ser;
        let archiveFile = fs.readFileSync(path.join(path.dirname(require.main.filename), 'network', 'dist', 'zerotoblockchain-network.bna'));
        businessNetworkConnection = new BusinessNetworkConnection();
        return BusinessNetworkDefinition.fromArchive(archiveFile)
            .then((bnd) => {
                ser = bnd.getSerializer();

                console.log(method + ' req.params.userID is: ' + req.params.userID);
                return businessNetworkConnection.connect(req.params.userID)
                    .then(() => {
                        return businessNetworkConnection.query('selectOrders')
                            .then((orders) => {
                                allOrders = new Array();
                                for (let each in orders) {
                                    (function (_idx, _arr) {
                                        let _jsn = ser.toJSON(_arr[_idx]);
                                        _jsn.id = _arr[_idx].orderNumber;
                                        allOrders.push(_jsn);
                                    })(each, orders);
                                }
                                res.json(allOrders);
                            })
                            .catch((error) => {
                                console.log('selectOrders failed ', error);
                                res.send({ 'result': 'failed', 'error': 'selectOrders: ' + error.message });
                            });
                    })
                    .catch((error) => {
                        console.log('businessNetwork connect failed ', error);
                        res.send({ 'result': 'failed', 'error': 'businessNetwork: ' + error.message });
                    });
            })
            .catch((error) => {
                console.log('create bnd from archive failed ', error);
                res.send({ 'result': 'failed', 'error': 'create bnd from archive: ' + error.message });
            });
    };

}