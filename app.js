var express = require("express");
var app = express();
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());
var value = random.integer(1, 100);

var team = ["Team 1", "Team 2", "team 3"];
app.get("/generate", function(req, res) {
  res.json(random.shuffle(team));
});

app.listen(3000, function() {
  console.log("Server started ");


});
