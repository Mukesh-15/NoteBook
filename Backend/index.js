const connectToMongo = require('./db');
const express = require('express');
connectToMongo();

const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors())
//Routes
app.use(express.json());;
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`istening on port http:localhost:${port}`)
})