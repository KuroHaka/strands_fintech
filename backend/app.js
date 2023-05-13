const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const util = require('util')

app.use(bodyParser.json({
  limit: '20mb'
}));
app.use(cors())


app.use('/group', require('./routes/groups.js'));
app.use('/product', require('./routes/products.js'));

app.listen(8000, () => {
  console.log("Started server");
})
