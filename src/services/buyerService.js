"use strict";
var buyerRepo = require("../repositories/buyerRepo");
var Buyer = require("../models/buyer");


var BuyerRepo = new buyerRepo();

module.exports = class BuyerService {
    constructor(){};
    getAll(req, res) {
        let method = "buyerService/getAll";


        BuyerRepo.getAll()
            .then(data => {
                console.log(method + " -->success");
                res.json(data);
            })
            .catch(error => {
                console.log(method + " -->failed: " + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });

    };
    insert(req, res) {
        let method = "buyerService/insert";
        console.log(method);

        let buyer = new Buyer(req.body.buyerID,req.body.buyerPW, req.body.companyName);


        BuyerRepo.insert(buyer)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };

    getByID(req, res) {
        let method = "buyerService/getByID";
        console.log(method);

        BuyerRepo.getByID(req.params.buyerID)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };

    update(req, res) {
        let method = "buyerService/update";
        console.log(method);

        let buyer = new Buyer(req.params.buyerID,req.body.buyerPW ,req.body.companyName);

        BuyerRepo.update(buyer)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };

    delete(req, res) {
        let method = "buyerService/delete";
        console.log(method);

        BuyerRepo.delete(req.params.buyerID)
            .then(result => {
                console.log(method + " -->success");
                res.json(result);
            })
            .catch(error => {
                console.log(method + " -->failed:" + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });
    };

};