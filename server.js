console.log('Lets have a drink')

const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const mongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = 'mongodb+srv://adamspersonaldeveloping:PDs2KTOUPh3VMDHU@whiskey.rndpglw.mongodb.net/?retryWrites=true&w=majority'
const PORT = 42069


MongoClient.connect(connectionString, {
    useUnifiedTopology: true 
})
    .then(client => {
        console.log('connected to databse "Whiskey"')

        const db = client.db('whiskey-api')
        const whiskeyCollection = db.collection('whiskeys')
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true}))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            whiskeyCollection.find().toArray()
                .then(results => {
                    res.render('index.ejs', { whiskeys: results})
                })
                .catch(error => console.error(error))
        })
        app.post('/whiskeys', (req, res) => {
            whiskeyCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                    console.log(result)
                })
                .catch(error => console.error(error))
        })
        app.delete('/deleteWhiskey', (req, res) => {
            whiskeyCollection.deleteOne( {whiskeys: req.body.name})
            .then(result => {
                console.log(`${req.body.name} has been deleleted`)
                res.json('Whiskey deleted')
            })
            .catch(error => console.error(error))
        })

        app.listen(process.env.PORT || PORT, function(){
            console.log(`listening on port: ${PORT}`)
        })
    })
    .catch(error => console.error(error))