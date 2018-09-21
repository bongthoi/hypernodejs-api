'use strict';
var connection=require('../utilities/mysqldb_connection');
var Product=require('../models/product');


module.exports=class Product{

    getAll(callback){
        let method="productRepo/getAll";
        console.log(method+ "  -->success");
        
        return connection.query("SELECT * FROM tb_product",callback);
    };
    insert(_product,callback){
        let method="productRepo/insert";
        console.log(method+ "  -->success");

        return connection.query("INSERT INTO tb_product(title,description,quantity,price,owner) VALUES(?,?,?,?,?)",[_product.title,_product.description,_product.quantity,_product.price,_product.owner],callback);
    };
    getByID(_productID,callback){
        let method="productRepo/getByID/productID: "+_productID;
        console.log(method+ "  -->success");

        return connection.query("SELECT * FROM tb_product WHERE id=?",[_productID],callback);
    };
    update(_product,callback){
        let method="productRepo/update/productID: "+_product;
        console.log(method+ "  -->success");

        return connection.query("UPDATE tb_product SET title=?,description=?,quantity=?,price=?,owner=? WHERE id=?",[_product.title,_product.description,_product.quantity,_product.price,_product.owner,parseInt(_product.id)],callback);
    };
    delete(_productID,callback){
        let method="productRepo/delete/productID: "+_productID;
        console.log(method+ "  -->success");

        return connection.query("DELETE FROM tb_product WHERE id=?",[_productID],callback);
    };
}