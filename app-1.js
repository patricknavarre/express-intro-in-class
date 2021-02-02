const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE - parses the data so that it's readable
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// anything with `:` after it becomeds "dynamic".  meaning any input will work

let artistArray = ["checkcheck", 12, 12, "thisIsOnlyATest"];

app.get("/", function(req, res){
    res.status(200).json({
        hello: "Greetings from EXPRESS!!!",
    });
});
app.get("/artist", function(req, res) {
    res.send("Welcome to the artist path!");
});

app.get('/artist/get-artist-data', function(req, res) {
    res.status(200).json({ data: artistArray });
});

app.get("/:artist/:anything", function (req, res) {
    console.log(req.params);

    res.status(200).json(req.params);
});

app.post("/artist/create-team", function (req, res){
    teamArray.push(req.body);
    
    res.status(200).json({ data: artistArray });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
