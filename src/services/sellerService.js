"use strict";
var sellerRepo = require("../repositories/sellerRepo");
var Seller = require("../models/seller");


var SellerRepo = new sellerRepo();

module.exports = class SellerService {
    constructor(){};
    getAll(req, res) {
        let method = "sellerService/getAll";


        SellerRepo.getAll()
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
        let method = "sellerService/insert";
        console.log(method);

        let seller = new Seller(req.body.sellerID,req.body.sellerPW, req.body.companyName);


        SellerRepo.insert(seller)
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
        let method = "sellerService/getByID";
        console.log(method);

        SellerRepo.getByID(req.params.sellerID)
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
        let method = "sellerService/update";
        console.log(method);

        let seller = new Seller(req.params.sellerID,req.body.sellerPW ,req.body.companyName);

        SellerRepo.update(seller)
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
        let method = "sellerService/delete";
        console.log(method);

        SellerRepo.delete(req.params.sellerID)
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