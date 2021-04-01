const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
env.config();

mongoose
  .connect(
    `	mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.vhfas.mongodb.net/Prashant?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('database is connected');
  });

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`the server is running on ${port}`);
});
