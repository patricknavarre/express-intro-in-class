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
    playersArray: [
      {
        player: "kobe",
      },
      {
        player: "shaq",
      },
    ],
  },
];

// at our `/` or home page we print out to the user a message - `res` is response(whats going out from us)
app.get("/", function (req, res) {
  res.send("Welcome to our first API!");
});

app.get("/team", function (req, res) {
  console.log(req.query);
  res.status(200).json({
    teamArray,
    query: req.query,
  });
});

// anything with `:` after it becomes "dynamic".  meaning any input after the : will work
app.get("/team/:teamID", function (req, res) {
  // set to a variable and assign that variable the value of null
  let targetTeamInfo = null;

  // converting req.params to a number
  let teamIDNumber = Number(req.params.teamID);

  // loop through the team array and find the matching ID
  teamArray.forEach((team) => {
    // return the matching ID
    if (team.id === teamIDNumber) {
      targetTeamInfo = team;
    }
  });

  //   if (targetTeamInfo === null)

  if (!targetTeamInfo) {
    return res.status(400).send("Sorry, that team does not exist!");
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
    if (team.id === teamIDNumber) {
      let singleTeamArray = team.playersArray;
      singleTeamArray.forEach((player) => {
        if (player.player === req.body.player) {
          res.status(404).send("Sorry this player already exists!");
        }
      });
      team.playersArray.push(req.body);
      console.log(team);
    }
  });

  res.status(200).json({
    teamArray,
  });
});

app.put("/team/edit-players/:teamID", function (req, res) {
  let teamIDNumber = Number(req.params.teamID);

  let obj = {};
  let teamIndex;
  let playerIndex;

  teamArray.forEach((team, indexTeam) => {
    if (team.id === teamIDNumber) {
      teamIndex = indexTeam;
      let singleTeamArray = team.playersArray;

      singleTeamArray.forEach((item, indexPlayer) => {
        if (item.player === req.body.player) {
          obj = { ...item, ...req.body };
          playerIndex = indexPlayer;
        }
      });
    }
  });

  //   teamArray.forEach((team, indexTeam) => {
  //     if (team.id === teamIDNumber) {
  //       teamIndex = indexTeam;
  //       let singleTeamArray = team.playersArray;

  //       singleTeamArray.forEach((item, indexPlayer) => {
  //         if (item.player === req.query.player) {
  //           obj = { ...item, ...req.query };
  //           playerIndex = indexPlayer;
  //         }
  //       });
  //     }
  //   });

  teamArray[teamIndex].playersArray[playerIndex] = obj;
  res.json(teamArray);
  // res.send("THIS IS THE PUT PATH");
});

app.delete("/team/delete-player-by-name/:teamID", function (req, res) {
    let teamIDNumber = Number(req.params.teamID);
    let name = req.params.id;
    
    teamArray.forEach((team) => {
        if (team.id === teamIDNumber) {
            let singleTeamArray = team.playersArray;
            singleTeamArray.forEach((player) => {
                if (player.player === req.body.player) {
                    team.playersArray.splice(name -1, 1);
                }
            });
        }
    });
    console.log(JSON.stringify(teamArray))
    
  res.json(teamArray);
});

// build in a return to exit out

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// res.end();
// res.status(404).end();
