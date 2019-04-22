"use strict";
var rq = require("request-promise");
const private_api = require("../../config/private_api.json");
let Transaction =require("../models/transaction");
const  ns="queries/getHistorianRecords";

module.exports = class TransactionRepo {
    getAll() {
        let trans = new Transaction();
        let result;

        let method = "transactionRepo/getAll";
        console.log(method);


        const options = {
            method: 'GET',
            headers : {		
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'                
            },
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + ns,
            json: true
        };
        
       return rq(options)
            .then(data => {
                console.log(method + " -->success");
                result=JSON.parse(JSON.stringify(data));
                return result;
            })
            .catch((err) => {
                console.log(method + " -->failed:");
                return console.log(err);
            });    
    };
   

};