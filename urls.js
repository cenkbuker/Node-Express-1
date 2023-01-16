const fs = require("fs");
const readline = require("readline");
const axios = require("axios");

const argv = process.argv;

let file = argv[2];

function processLineByLine(file) {
  fs.readFile(file, async (err, data) => {
    const lines = data.toString().split("\n");
    const promises = lines.map((line) => {
      return axios.get(line).catch(() => {
        console.log("Could not download " + line);
      });
    });
    const results = await Promise.allSettled(promises);
    results.forEach((r, idx) => {
      const data = r.value?.data;

      if (data) {
        const websiteUrl = new URL(lines[idx]);
        const websiteUrlHostname = websiteUrl.hostname;
        fs.writeFile(websiteUrlHostname, data, () => {
          console.log("Wrote to", lines[idx]);
        });
      }
    });
  });
}

processLineByLine(file);
