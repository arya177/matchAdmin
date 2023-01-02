const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const matchFunctions = require("./matchFunctions")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let matchID, comment;
app.get("/admin/create", (req, res) => {
  res.render("admin_create");
});

app.post("/admin/create", async (req, res) => {
  await matchFunctions.createMatch(req.body.ID, req.body.dateTime, req.body.Team1ID, req.body.Team2ID, req.body.category);
  res.redirect("/admin/create");
});

app.get("/admin/update", (req, res) => {
  res.render("admin_update", {matchID : matchID , comment: comment});
});

app.post("/admin/update", async (req, res) => {
  matchID = req.body.matchID;
  let team1Run = req.body.team1Run;
  let team2Run = req.body.team2Run;
  let data = await matchFunctions.fetchData(matchID);
  let matchStatus = "ongoing";
  if (req.body.isFinished) matchStatus = "past";
  comment = req.body.finalComment;

  if (team1Run.length != 0) {
    let totalBall = data.Team1Score.length - 1;
    let wicket = data.Team1Wicket;
    let extras = data.Team1Extra;
    let prev = data.Team1prev;
    if ((totalBall - extras) % 6 == 0)
      prev = totalBall + 1;
    if (team1Run.length == 1 && team1Run === 'w')
      wicket++;
    else if (team1Run.length == 2)
      extras++;
    await matchFunctions.Team1Update(matchID, wicket, extras, team1Run, prev, data.Team1Score, matchStatus, comment);
  } else {
    let totalBall = data.Team2Score.length;
    let wicket = data.Team2Wicket;
    let extras = data.Team2Extra;
    let prev = data.Team2prev;
    if ((totalBall - extras) % 6 == 0)
      prev = totalBall;
    if (team2Run.length == 1 && team2Run === 'w')
      wicket++;
    else if (team2Run.length == 2)
      extras++;
    await matchFunctions.Team2Update(matchID, wicket, extras, team2Run, prev, data.Team2Score, matchStatus, comment);
  }
  res.redirect("/admin/update");
});

app.listen('8000', () => {
  console.log("Server Is Running at port 8000");
});
