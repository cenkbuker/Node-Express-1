const express = require("express");
let axios = require("axios");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/", async function (req, res, next) {
  try {
    const developers = req.body.developers;
    const promises = developers.map(async (dev) => {
      return axios
        .get(`https://api.github.com/users/${dev}`)
        .catch("User not found");
    });
    const result = (await Promise.allSettled(promises)).filter(
      (r) => r.status === "fulfilled"
    );
    return res.json(result.map((r) => r.value.data));
  } catch (err) {
    return next(err);
  }
});

//TODO: add error handling

//TODO: listen separately
app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});
