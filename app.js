const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();
  let day = "";
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  day = new Date(today).toLocaleDateString("en-us", options);

  res.render("list", { listTitle: day, newItem: items });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItem: workItems });
});

app.post("/work", function (req, res) {
  console.log(req.body);
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/", function (req, res) {
  console.log(req.body);
  // Logic for choosing which array to push list item into
  if (req.body.list === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else if (req.body.list) {
    items.push(req.body.newItem);
    res.redirect("/");
  }
  // Logic for changing pages / servers
  if (req.body.listChange === "Work") {
    res.redirect("/");
  } else if (req.body.listChange) {
    res.redirect("/work");
  }
});

app.listen(3000, function () {
  console.log("We're functioning baby");
});
