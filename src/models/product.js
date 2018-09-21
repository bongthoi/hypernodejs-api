'use strict';

module.exports=class Product{
    constructor(id,title,description,quantity,price,owner){
        this.id=id;
        this.title=title;
        this.description=description;
        this.quantity=quantity;
        this.price=price,
        this.owner=owner;
    };
};