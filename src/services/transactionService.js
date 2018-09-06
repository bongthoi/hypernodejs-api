"use strict";
var transactionRepo = require("../repositories/transactionRepo");
var Transaction = require("../models/transaction");


var TransactionRepo = new transactionRepo();

module.exports = class TransactionService {
    constructor(){};
    getAll(req, res) {
        let method = "transactionService/getAll";


        TransactionRepo.getAll()
            .then(data => {
                console.log(method + " -->success");
                res.json(data);
            })
            .catch(error => {
                console.log(method + " -->failed: " + error.message);
                res.sendStatus(500).json({"result":"failed","error":+error.message});
            });

    };
    
};