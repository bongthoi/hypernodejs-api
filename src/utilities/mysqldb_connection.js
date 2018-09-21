'use strict'
const mysqldb_config=require('../../config/mysqldb_config.json');
var mysql=require('mysql');

var connection=mysql.createPool({host:mysqldb_config.host,database:mysqldb_config.database_name,user:mysqldb_config.user,password:mysqldb_config.password});

module.exports=connection;

