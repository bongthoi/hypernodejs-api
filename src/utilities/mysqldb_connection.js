'use strict'
const mysqldb_config=require('../../config/mysqldb_config.json');
var mysql=require('mysql');

//var connection=mysql.createPool({host:mysqldb_config.host,database:mysqldb_config.database_name,user:mysqldb_config.user,password:mysqldb_config.password});
var connection=mysql.createPool({
    connectionLimit : 100,
    host     : '103.77.169.245',
    port     :  3306,
    user     : 'mysql245',
    password : 'mysql245@glorious',
    database : 'hyperledgerapi'});

module.exports=connection;

