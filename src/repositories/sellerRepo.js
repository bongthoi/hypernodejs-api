"use strict";
var rq = require("request-promise");
const private_api = require("../../config/private_api.json");
var Seller = require("../models/seller");

module.exports = class SellerRepo {
    getAll() {
        let seller = new Seller();
        let result;

        let method = "sellerRepo/getAll";
        console.log(method);


        const options = {
            method: 'GET',
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + seller.$class,
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

    insert(_seller) {
        let seller = new Seller(_seller.sellerID,_seller.sellerPW,_seller.sellerWL, _seller.companyName);
        let result;

        let method = "sellerRepo/insert/sellerID: " + seller.sellerID;
        console.log(method);


        const options = {
            method: "POST",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + seller.$class,
            body: {
                "$class": seller.$class,
                "sellerID": seller.sellerID,
                "sellerPW":seller.sellerPW,
                "sellerWL":seller.sellerWL,
                "companyName": seller.companyName
            },
            json: true
        };
        return rq(options)
            .then(data => {
                console.log(method + " -->success");
                result=JSON.parse(JSON.stringify(data));
                return result;
            })
            .catch(err => {
                console.log(method + " -->failed");
                return console.log(err);
            });

    };

    getByID(_sellerID) {
        let seller = new Seller(_sellerID);
        let result;

        let method = "sellerRepo/getByID/sellerID: " + seller.sellerID;
        console.log(method);


        const options = {
            method: "GET",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + seller.$class + "/" + seller.sellerID,
            json: true
        };

        return rq(options)
            .then(data => {
                console.log(method + "-->success");
                result=JSON.parse(JSON.stringify(data));
                return result;
            })
            .catch(err => {
                console.log(method + " -->failed");
                return console.log(err);
            });
    };
    update(_seller) {
        let seller = new Seller(_seller.sellerID,_seller.sellerPW,_seller.sellerWL, _seller.companyName);
        let result;

        let method = "sellerRepo/update/sellerID: " + seller.sellerID;
        console.log(method);
        
        const options = {
            method: "PUT",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + seller.$class + "/" + seller.sellerID,
            body: {
                "$class": seller.$class,
                "sellerID": seller.sellerID,
                "sellerPW":seller.sellerPW,
                "sellerWL":seller.sellerWL,
                "companyName": seller.companyName
            },
            json: true
        };

        return rq(options)
            .then(data => {
                console.log(method + " -->success");
                result=JSON.parse(JSON.stringify(data));
                return result;
            })
            .catch(err => {
                console.log(method + " -->failed");
                return console.log(err);
            });
    };

    delete(_sellerID) {
        let seller = new Seller(_sellerID);

        let method = "sellerRepo/delete/sellerID: " + seller.sellerID;
        console.log(method);


        const options = {
            method: "DELETE",
            uri: private_api.api_ip + ":" + private_api.api_port + private_api.api_url + seller.$class + "/" + seller.sellerID,
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

};