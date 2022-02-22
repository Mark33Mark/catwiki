const path = require("path");
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const enforce = require("express-sslify");
const cors = require("cors");
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

app.get("/api", cors(), (req, res) => {
  const allData = res.json(kittyData);
});

app.get("/api/:name", (req, res) => {
  // getting selected breed name this way as req.params returns "service-worker.js"
  const url = req.rawHeaders[13];
  const breed = url
    .slice(url.lastIndexOf("/") + 1, url.length)
    .replace(/%20/g, " ");

  console.log(breed);

  // find the data array for a specific breed
  res.json(kittyData[kittyData.findIndex((item) => item.name === breed)]);
});

app.get("/more-pics/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const pics = await axios.get(
      `https://api.thecatapi.com/v1/images/search?order=ASC&limit=25&breed_id=${req.params.id}`
    );
    
    res.json(pics.data);
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
