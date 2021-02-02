const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE - parses the data so that it's readable
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let teamArray = [
    {
        id: 1,
        name: "lakers",
        playersArray: [],
    },
];

// at our `/` or home page we print out to the user a message - `res` is response(whats going out from us)
app.get("/", function (req, res) {
    res.send("Welcome to our first API!");
});


app.get("/team", function (req, res) {
    res.status(200).json({
        teamArray,
    });
});

// anything with `:` after it becomes "dynamic".  meaning any input after the : will work
app.get("/team/:teamID", function (req, res) {
  // set to a variable and assign that variable the value of null
  let targetTeamInfo = null;

  // converting req.params to a number
  let teamIDNumber = Number(req.params.teamID);


  console.log(req.params)

  // loop through the team array and find the matching ID
  teamArray.forEach((team) => {
    // console.log(typeof team.ID);
    // console.log(typeof req.params.teamID, req.params.teamID);

    // return the matching ID
    if (team.id === teamIDNumber) {
      targetTeamInfo = team;
    } 
  });

//   if (targetTeamInfo === null)

if (!targetTeamInfo) {
    return res.status(400).send('Sorry, that team does not exist!')
}

// 2nd way to solve the error message 
// if (team.id !== teamIDNumber) {
    // targetTeamInfo = "Sorry, the team does not exist!"
// }

  res.status(200).json({
    team: targetTeamInfo,
    // team: req.params.teamID,
    // allTeams: targetTeamID,
  });
});



app.post("/team", function (req, res) {
  teamArray.push({
    id: req.body.id,
    name: req.body.name,
    playersArray: req.body.playersArray,
  });

  res.status(200).json({
    teamArray,
  });
});

app.post("/team/add-players/:teamID", function (req, res) {
  let teamIDNumber = Number(req.params.teamID);

  teamArray.forEach((team) => {
    // console.log(team);
    if (team.id === teamIDNumber) {
    //   console.log(team);
      team.playersArray.push(req.body);
    }
  });

  // console.log(req.params);
  res.status(200).json({
    teamArray,
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
