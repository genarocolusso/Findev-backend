const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-s9tj0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
//antes das rotas. json
app.use(routes);
//chama as rotas

app.listen(3333);
