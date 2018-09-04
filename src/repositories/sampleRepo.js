"use strict";

module.exports=class sampleRepo{
    constructor(){};

    getAll(req,res){
        let method = "sampleRepo/getAll";
        console.log(method);
        return 200;
    };

    insert(req, res){
        let method = "sampleRepo/insert";
        console.log(method);
        return 200;
    };
    getByID(req, res){
        let method = "sampleRepo/getByID sampleID: " + req.params.sampleID;
        console.log(method);
        return 200;
    };
    update(req, res){
        let method = "sampleRepo/update sampleID: " + req.params.sampleID;
        console.log(method);
        return 200;
    };
    delete(req, res){
        let method = "sampleRepo/delete sampleID: " + req.params.sampleID;
        console.log(method);
        return 200;
    };
};