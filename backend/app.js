const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
var bodyParser = require('body-parser');
var cors = require('cors');

const port = 3001;

mongoose.connect(
  'mongodb+srv://rpg:3fwGehgotQoqQMAX@cluster0.0w5mp.mongodb.net/react-rpg-game?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

app.use(cors());

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`server running on ${port} boi`);
});
