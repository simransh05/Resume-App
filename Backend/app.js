const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const port = 4000;
const cors = require('cors')
app.use(express.json());
app.use(cors());

app.use('/',require('./routes/resume'))

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
