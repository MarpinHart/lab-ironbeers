const express = require("express");
const hbs = require("hbs");
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");

const punkAPI = new PunkAPIWrapper();
const app = express();

app.set("view engine", "hbs"); //We'll use hbs in the views folder
app.set("views", __dirname + "/views");

//Everything inside the '/public' is accessible
app.use(express.static(path.join(__dirname, "public")));

//console.log(path.join(`/path/example/`,))

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers });

      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom() //Gets an array with one object
    .then(beers => { //If i changed beers into apple
      res.render("random-beer", { //If I change this into banana I have to change also the hbs file
        beer: beers //I can change beers in apple and it would be the same
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
