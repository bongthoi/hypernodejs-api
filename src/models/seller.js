'use strict';
const bna_config=require("../../config/bna_config.json");

module.exports=class Seller{
        
    constructor(sellerID,sellerPW,sellerWL,companyName){
        this.$class=bna_config.namespace+".Seller";
        this.sellerID=sellerID;
        this.sellerPW=sellerPW;
        this.sellerWL=sellerWL;
        this.companyName=companyName;
    };

};