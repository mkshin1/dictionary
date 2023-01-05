import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

// Set up rendering engine
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

// Set up routes
app.get("/", (req, res) => {
  res.render("index", { title: "My App" });
});

app.get("/:word", (req, res) => {
  // Make a GET request to the API
  const word = req.params.word;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      // Send the data as the response
      res.render("index", { data });
    })
    .catch((error) => {
      // Send an error message if something went wrong
      // res.send(`Error: ${error}`);
      res.render("index", { error });
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
