const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');
const path = require('path');
const User = require('./modules/user/UserSchema');
const twitter = require('twitter');
const util = require('util');
const uuid = require("uuid/v4");

passport.use(new Strategy({
    consumerKey: '9QuyC9MW1YJw9XrpNtwTYD1Y0',
    consumerSecret: 'EwsPOXflGTZy3exR2jh4sgxxFea4cunLi4iOOks3wUxVwmFE5h',
    callbackURL: "http://localhost:8000/twitter/return"
  },
  function(token, tokenSecret, profile, cb) {
   
    let user = new User();

    user.save().then(function(data){
       if(data){
        return cb(null, profile);
       }
    });
      
  
  }
));

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '9QuyC9MW1YJw9XrpNtwTYD1Y0',
  consumer_secret: 'EwsPOXflGTZy3exR2jh4sgxxFea4cunLi4iOOks3wUxVwmFE5h',
  access_token_key: '988042591022305281-By7EKpRsOHfe5bSrsZEr4MajbrWb12u',
  access_token_secret: 'rM9MNTlsASlyt8g4JfENw4hGpKT8FYuVTK8DodfsnsdEQ'
});

passport.serializeUser(function(user, callback){
    callback(null, user);
});

passport.deserializeUser(function(obj, callback){
   callback(null, obj);
});




app.use(morgan('dev'));
app.use('/', express.static(__dirname+'./public'));
app.set('views', path.join(__dirname+'/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
 secret:'nothing',
 resave: true,
 saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    try{
        client.get('statuses/home_timeline', function(error, tweets, response) {
            if(!tweets){
                res.render('home',{user: req.user, tweets: null});
                return;
            } else{
            // console.log('tweets are '+util.inspect(tweets[0]));  // The favorites.
            // console.log('response is '+response);  // Raw response object.
          
            res.render('home',{user: req.user, tweets: tweets});
            }
          });

} catch(e){console.log(e)}
   
});



const sdk = (bucketName, key, filename)=>{
  return new Promise((resolve, reject)=>{
  var request = require('request');
  request(`http://64.110.130.161:8081/api/v1/file/url/${bucketName}/${key}/${filename}`, function (error, response, body) {
  // console.log('error:', error); 
  // console.log('statusCode:', response && response.statusCode); 
  // console.log('body:', body);
   resolve(body); 
  });
});

}

let bucketName = "shopup2";
let key = "15a5cp5di75l42.8cp2bo31k00h6ar39e37l35@$ar$4u$5m$cs$ca$4n$a.$5c$1o$2m$b$";
app.get("/url", async (req, res, next)=>{
  let filename = uuid();
  console.log(uuid());
  let body = await sdk(bucketName, key, filename);
   res.json(body);
});

app.get('/twitter/login', passport.authenticate('twitter'));
app.get('/twitter/return', passport.authenticate('twitter',{
    failureRedirect: '/'
}),
(req, res)=>{
    res.redirect('/');
});




module.exports = app;
