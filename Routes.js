const Router = require("express-promise-router");
const dirdata = require("./data");
const getfiletree = require("./Utils");
const rest_routes = new Router();

rest_routes.get("/path/:filepath?", async (req, res) => {
  let filepath = req.params.filepath;
  var output = null;
  if (filepath !== undefined && filepath !== null)
    output = getfiletree(dirdata, filepath);
  else output = getfiletree(dirdata, "");
  res.status(200).json(output);
});

module.exports = rest_routes;
