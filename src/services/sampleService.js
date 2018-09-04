'use strict';
var Sample = require("../repositories/sampleRepo");

/**sampleService */
module.exports =class SampleService {
    getAll(req,res){
        let sampleRepo=new Sample();

        let method="sampleService/getAll";
        console.log(method);

       
        let result=sampleRepo.getAll(req,res);
        console.log(result);
        res.sendStatus(result);
        
    };
    insert(req,res){
        let method="sampleService/insert";
        console.log(method);

        let result=sampleRepo.insert(req,res);
        console.log(result);
        res.sendStatus(result);
    };
    getByID(req,res){
        let method="sampleService/getByID";
        console.log(method);

        let result=sampleRepo.getByID(req,res);
        console.log(result);
        res.sendStatus(result);
    };
    update(req,res){
        let method="sampleService/update";
        console.log(method);

        let result=sampleRepo.update(req,res);
        console.log(result);
        res.sendStatus(result);
    };
    delete(req,res){
        let method="sampleService/delete";
        console.log(method);

        let result=sampleRepo.delete(req,res);
        console.log(result);
        res.sendStatus(result);
    };
};