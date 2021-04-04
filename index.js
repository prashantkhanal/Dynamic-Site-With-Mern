const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const app = express();
env.config({ path: './.env' });

app.use(express.json());

const DB = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.vhfas.mongodb.net/Prashant?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database is connected');
  })
  .catch((err) => console.log(err));

const userSignupRoutes = require('./src/router/userSignup');
const userSigninRoutes = require('./src/router/userLogin');

app.use('/api/v1', userSignupRoutes);
app.use('/api/v1', userSigninRoutes);

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`the server is running on ${port}`);
});
