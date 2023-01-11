// app.js 
const express = require('express');
const app = express();
const con = require('./config');
const bp = require('body-parser');
const path=require('path');
const alert = require('alert');
const confirm = require('confirm');
const { response } = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const router = express.Router();
var obj = {};

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret : 'rentallink',
    cookie : {maxAge : 60000},
    saveUninitialized : false,
    resave : false
}))
app.use(flash());





app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
    
});

app.get('/login.html',(req,res)=>{
    res.render('login.ejs');
    
});

app.get('/tenant',(req,res)=>{
    res.render('tenant.ejs');
    
});

app.get('/home',(req,res)=>{
    res.render('home.ejs');
    
});

app.get('/tenantsignup',(req,res)=>{
    res.render('tenantsignup.ejs');
})

app.get('/ownersignup',(req,res)=>{
    res.render('ownersignup.ejs');
})

app.get('/tenantlogin',(req,res)=>{
    res.render('tenantlogin');
})

app.get('/ownerlogin',(req,res)=>{
    res.render('ownerlogin.ejs');
})

app.get('/tenant',(req,res)=>{
    res.render('tenant.ejs');
})

// app.get('/ownerprofile',(req,res)=>{
//     res.render('ownerprofile');
// })




app.post('/tenantsignup',(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const username = req.body.username;
    const email_ID = req.body.emailid;
    const contact = req.body.ph;
    const pwd = req.body.pass;
   var sql = "INSERT INTO signup(name,username,email_ID,contact,pwd)VALUES('"+name+"','"+username+"','"+email_ID+"','"+contact+"','"+pwd+"')";
        con.query(sql,function(err,result){
            if(err) {console.log("ayyo");}
            alert("registration successfull");
            res.redirect('/tenantlogin');
        })
        // res.send("Registration successful");
    //    res.send("ok registered");
    })
    
app.post('/tenantlogin',(req,res)=>{
    var username = req.body.username;
    var pwd = req.body.password;
    if(username && pwd){
        con.query('select * from signup where username = ? and pwd = ?',[username,pwd],(err,result,fields)=>{
            if(result.length>0){
                res.redirect('/listofrooms');
                // console.log(username,pwd);
            }
            else{
                alert('success',"Incorrect Username and Password");
            }
        });
    }
    else{
        alert("Please enter Username and Password");
    }
})


// router.get("/tenant",(req,res,next)=>{
//     var query = "select Name,landmark,Address from pg ";
//     con.query(query,(err,data)=>{
//         if(err){throw error;}
//         else{
//             obj = {print:res};
//             // res.render('listofrooms',{action:"list",sampleData:data});
//             res.render('print',obj);
//         }
//     });
// })

app.get("/roomlist",function(req,res){
    var sql = "select Name,landmark,Address from pg";
    con.query(sql,function(err,result){
        if(err){console.log(err)};
        res.render("./roomlist",{Room:result});
    })
})

app.get("/listofrooms",function(req,res){
    var sql = "select Name,landmark,Address from pg";
    con.query(sql,function(err,result){
        if(err){console.log(err)};
        res.render("./listofrooms",{Room:result});
    })
})

app.get('/search',function(req,res){
    var landmark = req.query.landmark;
    var sql = "select * from pg where landmark like '%"+landmark+"'";
    con.query(sql,function(err,result){
        if(err) {console.log(err)}
        res.render('./listofrooms',{Room:result});
    })
})

app.get("/flatlist",function(req,res){
    var sql = "select Name,landmark,Address from flat";
    con.query(sql,function(err,result){
        if(err){console.log(err)};
        res.render("./flatlist",{Room:result});
    })
})

app.get('/searchflat',function(req,res){
    var landmark = req.query.landmark;
    var sql = "select * from flat where landmark like '%"+landmark+"'";
    con.query(sql,function(err,result){
        if(err) {console.log(err)}
        res.render('./flatlist',{Room:result});
    })
})

app.post('/ownersignup',(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const username = req.body.username;
    const email_id = req.body.emailid;
    const contact = req.body.ph;
    const pwd = req.body.pass;
    const address = req.body.address;
   var sql = "INSERT INTO ownersignup(name,username,email_ID,contact,pwd,address)VALUES('"+name+"','"+username+"','"+email_id+"','"+contact+"','"+pwd+"','"+address+"')";
        con.query(sql,function(err,result){
            if(err) {console.log("error");}
            alert("registration successfull");
            res.redirect('/ownerlogin');
        })
        // res.send("Registration successful");
    //    res.send("ok registered");
    })
    var uname;
    var pass;
    app.post('/ownerlogin',(req,res)=>{
         uname = req.body.username;
         pass = req.body.password;
        if(uname && pass){
            con.query('select * from ownersignup where username = ? and pwd = ?',[uname,pass],(err,result,fields)=>{
                if(result.length>0){
                    res.redirect('/ownerprofile');
                    // console.log(res);
               }
                else{
                    alert("Incorrect Username and Password");
                }
            });
        }
        else{
            alert("Please enter Username and Password");
        }
    })
    
    app.post('/tenantlogin',(req,res)=>{
         var username = req.body.username;
         var pwd = req.body.password;
        if(username && pwd){
            con.query('select * from signup where username = ? and pwd = ?',[username,pwd],(err,result,fields)=>{
                if(result.length>0){
                    res.redirect('/listofrooms');
                    // console.log(username,pwd);
                }
                else{
                    alert("Incorrect Username and Password");
                }
            });
        }
        else{
            alert("Please enter Username and Password");
        }
    })

    // app.get("/ownerprofile",function(req,res){
    //     var sql = "select * from owner where username = '"+uname+"' and pwd = '"+pass+"'; select * from pg";
    //     con.query(sql,function(err,result){
    //         if(err){console.log(err)};
    //         res.render("./ownerprofile",{o:result[0],Room:result[1]});
    //     })
    // })

    app.get("/ownerprofile",function(req,res){
        var sql = "select * from owner where username = '"+uname+"' and pwd = '"+pass+"'; select p.PG_ID,p.Name,p.landmark,p.Address from pg p,owner o where o.username = '"+uname+"' and o.Owner_ID=p.Owner_ID;select f.Flat_ID,f.Name,f.landmark,f.address from flat f,owner o where o.username='"+uname+"' and o.Owner_ID = f.Owner_ID";
        con.query(sql,function(err,result){
            if(err){console.log(err)};
            res.render("./ownerprofile",{o:result[0],Room:result[1],flat:result[2]});
        })
    })


    app.get('/pg:id', function (req, res) {
        var pid = req.params.id;
        console.log(pid);
        con.query(`SELECT * from pg where Name='${req.params.id}'`, function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
             res.render('roomdet',{Room:results});
          } else {
            console.log("Not found");
          }
        });
      })

      app.get('/flat:id', function (req, res) {
        var pid = req.params.id;
        console.log(pid);
        con.query(`SELECT * from flat where Name='${req.params.id}'`, function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
             res.render('flatdet',{Room:results});
          } else {
            console.log("Not found");
          }
        });
      })

      app.get('/deletepg',(req,res)=>{
        var sql = "delete from pg where PG_ID=?";

        var PG_ID = req.query.PG_ID;
        con.query(sql,[PG_ID],(err,result)=>{
            if(err) {console.log(error)}
            res.redirect('/ownerprofile');
        })
      })

      app.get('/deleteflat',(req,res)=>{
        var sql = "delete from flat where Flat_ID=?";

        var Flat_ID = req.query.Flat_ID;
        con.query(sql,[Flat_ID],(err,result)=>{
            if(err) {console.log(error)}
            res.redirect('/ownerprofile');
        })
      })
    
app.listen(3000);

