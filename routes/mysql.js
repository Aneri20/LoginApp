var ejs= require('ejs');//importing module ejsvar
mysql = require('mysql');//importing module mysql

function getConnection(){
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'aneri',
        password : 'aneri',
        database : 'assignment',
        port : 3306
    });
    return connection;
}

function fetchData(callback, sqlQuery){
    console.log("\nSqlquery:: "+ sqlQuery );
    var connection = getConnection();
    connection.query(sqlQuery, function(err, rows, fields){
        if(err){
            console.log("ERROR: " + err.message);
        }
        else{
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("Connection closed");
    connection.end();
}

function storeData(callback,sqlQuery)
{
    console.log("\nSqlquery::"+sqlQuery);
    var connection=getConnection();
    connection.query(sqlQuery,function(err,rows,fields){
        if(err){
            console.log("Error:"+err.message);
        }
        else
        {
            console.log("success");
            rows=1;
            callback(err,rows);
        }
    });console.log("Connection closed");
    connection.end();
}
exports.fetchData = fetchData;
exports.storeData = storeData;
