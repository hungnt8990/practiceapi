require("dotenv").config();
const express           = require("express");
const bodyParser        = require("body-parser");
const mongoose          = require('mongoose');
var cors = require('cors')
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var db = mongoose.connection;
var options = { server:  { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/practice',options);
mongoose.connect(process.env.DATABASE,options);

mongoose.set('debug', false);
db.on('error', function (err) { console.log(err); });
db.once('open', function (callback) { console.log('Succeeded connected to mongo DB');});
var userModel           = require('./userModel');
var User           = mongoose.model('User');


app.post('/api/signin',(req,res)=>{
    if(req.body.email && req.body.password){
        User.find({email:req.body.email},(err,result)=>{
            if(err){
                res.json({success:false,result:err})
            }else{
                if(result.length > 0){
                    if(req.body.password === result[0].password){
                        res.json({success:true,result:result})
                    }else{
                        res.json({success:false,result:'Password do not match'});
                    }
                }else{
                    res.json({success:false,result:'User do not exists'});
                }
            }
        })
    }else{
        res.json({success:false,result:'Full infomation Please'})
    }
})

app.post('/api/signup',(req,res)=>{
    if(req.body.email && req.body.password && req.body.fullname && req.body.phone){
        User.find({email:req.body.email},(err,result)=>{
            if(err){
                res.json({success:false,result:err})
            }else{
                if(result.length > 0){
                    res.json({success:false,result:'User is exists. Please choose other email'});
                }else{
                    var user = new User({
                        email : req.body.email,
                        fullname : req.body.fullname,
                        password : req.body.password,
                        phone : req.body.phone
                    })
                    user.save(function(err) {
                        if(err) res.json({success:false,result:err})
                        else res.json({success:true,result:'OK'})
                    })
                }
            }
        })
    }else{
        res.json({success:false,result:'Full infomation Please'})
    }

   
})

app.listen(9999, function() {
  console.log("Express running");
});