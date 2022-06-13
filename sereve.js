// dependacies
const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');


// initializing express
constapp = express();
// config app settings
require('dotenv').config();

const { PORT=4000, MONGODB_URL } = process.env;

//connecte to mongo db
mongoose.connect(MONGODB_URL);

//Mongo stautu listeners 
mongoose.connection
.on('connected', () => console.log('connected to MogoDB'))
.on('error', (error) => console.log("you are disconnected from mongooseDb"))

// set up our model
const peopleShema = mongoose.Schema({
    name: String,
    image: String,
    title: String,
}, 
{ timestamps: true });

const People = mongoose.model('People', peopleShema);

//mount middleware 
app.use(cors()); // Access-Control-Allow: '*'
app.use(morgan('dev'));
app.use(express.json());

 // mont routes
app.get('/', (req, res) => {
    res.send('hello');
});
// tell express to listen
// app.listen(PORT, () => {
//     console.log(`Express is listeningto prot :${PORT}`);
// });

// index
app.get('/people', async (req, res) => {
    try{
        // const people = await People.find({});
        res.json(await People.find({}));
    }catch (error) {
        console.log ('error: ', error);
        res.json({error: 'something went wrong - check cosole'});
    }
})
//create
app.post('/people', async (req, res) => {
    try{
        res.json(await People.create(req, res));
    }catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check cosole'});
    }
});
//update

//delete