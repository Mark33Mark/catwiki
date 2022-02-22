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

app.get("/spinning", (req, res) => {
  res.json({ message: "😻 Welcome, from Kitty-Wiki 😸" });
});

app.get("/api", async (req, res) => {
  try {
    const allData = await axios.get(`https://api.thecatapi.com/v1/breeds`);
    const names = allData.data.map((breed) => breed.name);
    console.log(names);
    res.status(200).send(names);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/:name", async (req, res) => {
  try {
    // getting selected breed name this way as req.params returns "service-worker.js"
    const url = req.rawHeaders[13];
    const breed = url
      .slice(url.lastIndexOf("/") + 1, url.length)
      .replace(/%20/g, " ");

    console.log(breed);

    const allData = await axios.get(`https://api.thecatapi.com/v1/breeds`);

    const breedData = { allData };
    const breedArray = breedData.allData.data;
    const breedSelected =
      breedArray[breedArray.findIndex((item) => item.name === breed)];
    console.log(breedSelected);
    res.status(200).send(breedSelected);
  } catch (err) {
    console.log(err);
  }
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
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// required for Lighthouse PWA test app to be installable.
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.listen(PORT, () => {
  console.log(
    `\n------------------------\n\nServer is running:   http://localhost:${PORT}      👀\n` +
      `\n------------------------\n`
  );
});
