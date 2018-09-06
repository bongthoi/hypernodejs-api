'use strict';
module.exports = function (app) {
    let invalidPathUtility = require("../utilities/invalidPathUtility");
    let sampleService = require("../services/sampleService");
    let buyerService = require("../services/buyerService");
    let transactionService = require("../services/transactionService");
    let bna_config = require("../../config/bna_config.json");

    /** */
    let SampleService = new sampleService();
    let BuyerService = new buyerService();
    let TransactionService=new transactionService();

    /**Buyers */
    app.route("/api/client/" + bna_config.namespace + ".Buyer")
        .get(BuyerService.getAll)
        .post(BuyerService.insert);
    app.route("/api/client/" + bna_config.namespace + ".Buyer/:buyerID")
        .get(BuyerService.getByID)
        .put(BuyerService.update)
        .delete(BuyerService.delete);

    /**Transaction */
    app.route("/api/client/" + bna_config.namespace + ".Transaction")
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