const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
require('dotenv').config(); 
const dbConnectionStr = process.env.DB_STRING
const dbName = 'pumping-floz'

// callback

// MongoClient.connect('mongodb+srv://chrisreidr:Noketachob1@cluster0.akj1e.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
//     if (err) return console.error(err);
//     console.log('Connected to Database');
// })

// promise

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to Database`)
        const db = client.db(dbName)
        const flozCollection = db.collection('flozCollection')

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))


        app.get('/', (req, res) => {
            db.collection('flozCollection').find().toArray()
            .then(results => {
                res.render('index.ejs', {flozCollection: results});
            })
            .catch(err => console.error(err));
        })

        app.post('/addfloz', (req, res) => {
            flozCollection.insertOne(req.body)
              .then(result => {;
                res.redirect('/');
              })
              .catch(error => console.error(error))
          })

          app.put('/addfloz', (req, res) => {
              console.log(req.body);
            flozCollection.findOneAndUpdate(
                { babyAte: "4" },
                {
                    $set: {
                        babyAte: req.body.babyAte,
                        timeBabyAte: req.body.timeBabyAte
                    }
                },
                {
                    upsert: true
                }
            )
            .then(result => {
                res.json('Success');
            })
            .catch(err => console.error(err))
        })

        app.delete('/addfloz', (req, res) => {
            flozCollection.deleteOne(
                { babyAte: req.body.babyAte}
            )
            .then(result => {
                if(result.deletedCount === 0) {
                    return res.json('No entry to delete')
                }
                res.json('Deleted entry')
            })
            .catch(err => console.error(err))
        })

        app.listen(process.env.PORT || PORT, function() {
            console.log(`Server running on port ${PORT}`);
        })
    })
console.log("Pump it up.");