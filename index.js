const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  res.send('hello world')
})


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://emajon:emaJohn21@cluster0.dbk4b.mongodb.net/ema_John?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("ema_John").collection("ema_collection");

  //post data to database
  app.post('/addProducts',(req,res)=>{
    const products = req.body;
    collection.insertMany(products)
    .then(result =>{
      console.log(result.insertedCount);
    })
  })

  app.post('/productWithKey',(req,res)=>{
    const productKeys = req.body;
    collection.find({key: {$in: productKeys}})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

  //get data from database
  app.get('/products',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
    //get data from database
    app.get('/products/:key',(req,res)=>{
      collection.find({key: req.params.key})
      .toArray((err,documents)=>{
        res.send(documents[0])
      })
    })
  
});


app.listen(port,()=>{console.log('port 5000 started')})