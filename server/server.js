const path = require("path");
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const enforce = require("express-sslify");
const kittyData = require("./db/kittyDb.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("x-api-key", process.env.API_KEY);
  next();
});

app.get("/spinning", (req, res, next) => {
  res.json({ message: "😻 Welcome, from Kitty-Wiki 😸" });
  next();
});

app.get("/api", (req, res, next) => {
  const allData = res.json(kittyData);
  next();
});

app.get("/api/:name", (req, res, next) => {
  // getting selected breed name this way as req.params returns "service-worker.js"
  const url = req.rawHeaders[13];
  const breed = url
    .slice(url.lastIndexOf("/") + 1, url.length)
    .replace(/%20/g, " ");

  console.log(breed);

  // find the data array for a specific breed
  res.json(kittyData[kittyData.findIndex((item) => item.name === breed)]);
  next();
});

// using Axios to call the cat API for maximum allowed images of the cat breed.
app.get("/more-pics/:id", async (req, res, next) => {
  console.log(req.params.id);
  try {
    const pics = await axios.get(
      `https://api.thecatapi.com/v1/images/search?order=ASC&limit=25&breed_id=${req.params.id}`
    );

    res.json(pics.data);
    next();
  } catch (err) {
    console.log(err);
  }
});

// if in production then serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// required for Lighthouse PWA test app to be installable.
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.listen(PORT, () => {
  console.log(
    `\n------------------------\n\nServer is running:   http://localhost:${PORT}      👀\n` +
      `\n------------------------\n`
  );
});

/*
* Instead of making multiple additional API calls outside of the app, I decided to grab the data
* and dropped it into a JSON file as I think for the purposes of this exercise this is ok - the Cat API has a bit of lag
* so doing this way will hopefully speed it up.
* Idea would be to set up a monthly refresh or similar using a packange such as cron https://www.npmjs.com/package/cron
* Ran the following in the console whilst located in the Cat API page.

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", process.env.API_KEY);

const formdata = new FormData();

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

fetch("https://api.thecatapi.com/v1/breeds?format=json", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

*/
