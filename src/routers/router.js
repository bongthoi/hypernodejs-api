'use strict';
module.exports = function (app) {
    let invalidPathUtility = require("../utilities/invalidPathUtility");
    let sampleService = require("../services/sampleService");
    let bna_config = require("../../config/bna_config.json");
    let buyerService = require("../services/buyerService");
    let sellerService = require("../services/sellerService");
    let orderService = require("../services/orderService");
    let transactionService = require("../services/transactionService");
    let productService=require('../services/productService');
    

    /** */
    let SampleService = new sampleService();
    let BuyerService = new buyerService();
    let SellerService=new sellerService();
    let TransactionService=new transactionService();
    let OrderService=new orderService();
    let ProductService=new productService();

    /**Buyers */
    app.route("/api/" + bna_config.namespace + ".Buyer")
        .get(BuyerService.getAll)
        .post(BuyerService.insert);
    app.route("/api/" + bna_config.namespace + ".Buyer/:buyerID")
        .get(BuyerService.getByID)
        .put(BuyerService.update)
        .delete(BuyerService.delete);

    /**Sellers */
    app.route("/api/" + bna_config.namespace + ".Seller")
        .get(SellerService.getAll)
        .post(SellerService.insert);
    app.route("/api/" + bna_config.namespace + ".Seller/:sellerID")
        .get(SellerService.getByID)
        .put(SellerService.update)
        .delete(SellerService.delete);

    /**Orders */
    app.route("/api/" + bna_config.namespace + ".Order")
        .get(OrderService.getAll)
        .post(OrderService.insert);
    app.route("/api/" + bna_config.namespace + ".Order/:orderNumber")
        .get(OrderService.getByID)
        .put(OrderService.update)
        .delete(OrderService.delete);
    app.route("/api/" + bna_config.namespace + ".Order.getOrderByUserID")
        .post(OrderService.addOrder);
    app.route("/api/" + bna_config.namespace + ".Order.getOrderByUserID/:userID")
        .get(OrderService.getOrderByUserID);
        
    /**Products */
    app.route("/api/" + bna_config.namespace + ".Product")
        .get(ProductService.getAll)
        .post(ProductService.insert);
    app.route("/api/" + bna_config.namespace + ".Product/:id")
        .get(ProductService.getByID)
        .put(ProductService.update)
        .delete(ProductService.delete);
    app.route("/api/" + bna_config.namespace + ".ProductByOwner/:owner")
        .get(ProductService.getByOwner);
    app.route("/api/" + bna_config.namespace + ".ProductByTitleandOwner/:title/:owner")
        .get(ProductService.getByTitleandOwner);

    /**Transaction */
    app.route("/api/" + bna_config.namespace + ".Transaction")
        .get(TransactionService.getAll);
        

    /**Samples */
    app.route("/restapi/client/samples")
        .get(SampleService.getAll)
        .post(SampleService.insert);
    app.route("/restapi/client/sample/:sampleID")
        .get(SampleService.getByID)
        .put(SampleService.update)
        .delete(SampleService.delete);

    /**Invalid path */
    app.route("*").get(invalidPathUtility.invalidPath).post(invalidPathUtility.invalidPath).put(invalidPathUtility.invalidPath).delete(invalidPathUtility.invalidPath);
};