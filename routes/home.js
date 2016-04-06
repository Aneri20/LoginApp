var ejs = require('ejs');
var mysql = require('./mysql');


function signup(req,res) {
    res.render('signup');

}
function afterSignIn(req, res){
    var getUser="select * from users where username='"+req.param("user_name")+"' and password='" + req.param("password") +"'";


    mysql.fetchData(function(err, results){
        if(err){
            throw err;
        }
        else {
            if(results.length > 0){
                console.log("valid Login");
                req.session.user_name = req.param("user_name");
                ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
                    if (!err) {
                        res.end(result);
                    }
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
            else{
                console.log("Invalid Login");
                ejs.renderFile('./views/failLogin.ejs',function(err, result){
                    if(!err){
                        res.end(result);
                    }
                    else{
                        res.end("error occured");
                        cosole.log(err);
                    }
                });
            }
        }

    }, getUser);
}
function add_details(req,res)
{


    var insert_basic = "insert into users(username,password,firstname,lastname,date,gender) values('"+req.param("user_name")+"','"+req.param("password")+"','"+req.param("first_name")+"','"+req.param("last_name")+"','"+req.param("date")+"','"+req.param("gender")+"')";

    console.log("Query is:"+insert_basic);
    mysql.storeData(function(err,results) {
        if(err){
            throw err;
        }
        else {
            if(results>0){
                console.log("data entered");
                ejs.renderFile('./views/login.ejs', { data: results } , function(err, result) {
                    if (!err) {
                        res.end(result);

                    }
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });}
            else{
                console.log("Signup Failed");
                ejs.renderFile('./views/signup.ejs',function(err, result){
                    if(!err){
                        res.end(result);
                    }
                    else{
                        res.end("error occured");
                        console.log(err);
                    }
                });
            }
        }

    }, insert_basic);
}
function logout(req,res) {

    console.log("bye bye");
    req.session.destroy();
    res.redirect('/');
};
exports.add_details=add_details;
exports.signup=signup;
exports.afterSignIn=afterSignIn;
exports.logout=logout;
