//This file for local server development
const express = require("express");
const cors = require("cors");
var rest_routes = require("./Routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", rest_routes);

app.listen(port, () => console.log(`started at ${port}`));
