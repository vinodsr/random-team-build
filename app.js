var express = require("express");
var app = express();
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());
var jsonfile = require('jsonfile');

app.use(express.static('static'));
app.get("/generate", function(req, res) {

  jsonfile.readFile("./config.json", function(err, data) {
    if (err) {
      console.log(err);
      res.json(prepareMessage(1, err));
      return;
    }

    var randomMembers = random.shuffle(data.members);
    var teams = data.teams;
    var teamcount = teams.length;
    var result = {};
    var currentTeamIdx = 0;
    var currentTeam = "";
    randomMembers.forEach(function(member) {
      currentTeam = teams[currentTeamIdx];
      if (typeof result[currentTeam] === "undefined") {
        result[currentTeam] = [];
      }
      result[currentTeam].push(member);

      currentTeamIdx++;
      if (currentTeamIdx >= teams.length) {
        currentTeamIdx = 0;
      }

    });

    //save the data in a file

    jsonfile.writeFile("result/" + new Date().getTime(), result,
      function(err) {
        if (err) {
          console.error("error in writting file ", err);
        }
      });

    res.json(result);
  });

});
// start server
app.listen(3000, function() {
  console.log("Server started ");


});


var prepareMessage = function(errcode, message) {
  return {
    statusCode: errcode,
    statusMessage: message
  };
};
