var mysql      = require('mysql');
const express = require('express')
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dashboard'
});

  connection.connect();

  var id=0;
  

var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',function(req,res){

    var select  = "select * from register";

    connection.query(select, function (error, results, fields) {
        if (error) throw error;
         res.render("register",{results})
      });
})
app.post('/',function(req,res){
  
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var city = req.body.city;
    var hobby = req.body.hobby;
    var contact_no = req.body.contact_no;
    var address = req.body.address;
    var dob = req.body.dob;

    var insert = "insert into register(name,email,password,city,hobby,contact_no,address,dob) values ('"+name+"','"+email+"','"+password+"','"+city+"','"+hobby+"','"+contact_no+"','"+address+"','"+dob+"')";
    connection.query(insert, function (error, results, fields) {
        if (error) throw error;
           res.redirect("/login");
      });
})





app.get('/login',function(req,res){

       res.render("login")
})


app.post('/login',function(req,res){

  var email = req.body.email;
  var password = req.body.password;

  var login_query = "select * from register where email='"+email+"' and password='"+password+"'";

  connection.query(login_query, function (error, results, fields) {
    if (error) throw error;
    if(results.length==1)
    {
      id=results[0].id;
      res.redirect("/Dashboard");
    }
    else{
        res.send("INVALID EMAIL OR PASSWORD !!!!!!!!!")
    }
  });
})

app.get('/Dashboard',function(req,res){
  
  var select = "select * from register where id='"+id+"'";

  connection.query(select, function (error, results, fields) {
      if (error) throw error;

       res.render("dashboard",{results})
    });
})




app.listen(3000);
