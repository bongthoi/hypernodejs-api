'use strict';
module.exports = function (app) {
    let invalidPathUtility = require("../utilities/invalidPathUtility");
    let sampleService = require("../services/sampleService");
    let buyerService = require("../services/buyerService");

    /** */
    let SampleService = new sampleService();
    let BuyerService = new buyerService();

    /**Buyers */
    app.route("/restapi/client/buyers")
        .get(BuyerService.getAll)
        .post(BuyerService.insert);
    app.route("/restapi/client/buyer/:buyerID")
        .get(BuyerService.getByID)
        .put(BuyerService.update)
        .delete(BuyerService.delete);


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