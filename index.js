var Twit = require('twit')
var express = require("express");
const cors = require("cors");
const app = express()
const PORT = 8000;
app.use(cors());
app.use(express.json());
var T = new Twit({
  consumer_key:         'uC3RPEJvk8QUrFPvKazrgcpOB',
  consumer_secret:      'Z94C8CvOLHR0e0mqB7S2YGaUJ6etOvAxuphLfxHQYu2cJMwLdM',
  access_token:         '776447053392031744-cruLd8ksD5jM24hMz3wPo8FtWctivlz',
  access_token_secret:  'dpKu8PhBwoYVOJ3dykdLAya1PHjbFFJVM1zlsVnsmdl3y',
  tweet_mode: 'extended',
  
})
app.use(express.static("public"))
// app.get("/",(req,res)=>{
//   res.sendFile('./public/index.html');
// })

app.get("/getTweets",(req,res)=>{
  city = req.query.city;
  type = req.query.type;
  T.get('search/tweets', {q: `verified ${city} (${type}) -"not verified" -"un verified" -"urgent" -"unverified" -"needed" -"required" -"need" -"needs" -"requirement" -"Any verified lead"  -RT since:2021-07-11`, count: 100, include_entities: 1, tweet_mode:'extended', }, 
  function(err, data, response) {
    if(!err){
      res.send({"tweets":data})

    }else{
      res.status(400).send({"error":"Got Error while fetching tweets"})
    }
  })
})


//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//


app.listen(process.env.PORT || PORT,()=>{
  console.log(`Listening on http://localhost:${PORT}`)
})

