'use strict';
var ProductRepo = require('../repositories/productRepo');
var Product = require('../models/product');


/** */
var productRepo = new ProductRepo();

module.exports = class ProductService {
    constructor() { };
    getAll(req, res, next) {
        let method = "productService/getAll";
        console.log(method);


        productRepo.getAll(function (err, data) {
            if (err) {
                res.json(err);
            } else {
                console.log(method+ "  -->success");
                res.json(data);
            }
        });
    };

    insert(req, res) {
        let method = "productService/insert";
        console.log(method);

        let product = new Product(null, req.body.title, req.body.description,req.body.quantity, req.body.price, req.body.owner);
        productRepo.insert(product, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                console.log(method+ "  -->success");
                res.json(data);
            }
        });

    };

    getByID(req, res) {
        let method = "productService/getByID: " + req.params.id;
        console.log(method);

        productRepo.getByID(req.params.id, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                console.log(method+ "  -->success");
                res.json(data);
            }
        });

    };

    update(req, res) {
        let method = "productService/update: " + req.params.id;
        console.log(method);

        let product = new Product(req.params.id, req.body.title, req.body.description,req.body.quantity,req.body.price, req.body.owner);
        productRepo.update(product, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                console.log(method+ "  -->success");
                res.json(data);
            }
        });

    };

    delete(req, res) {
        let method = "productService/delete: " + req.params.id;
        console.log(method);

        productRepo.delete(req.params.id, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                console.log(method+ "  -->success");
                res.json(data);
            }
        });

    };


};