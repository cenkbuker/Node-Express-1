const fs = require("fs");
const readline = require("readline");
const axios = require("axios");

const argv = process.argv;

let file = argv[2];

async function processLineByLine(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    let websiteUrl = new URL(line);
    let websiteUrlHostname = websiteUrl.hostname;
    let website = axios
      .get(line)
      .then((data) =>
        fs.writeFile(websiteUrlHostname, `${data.data}`, (err) => {
          if (err) {
            throw err;
          }
          console.log(`Wrote to ${websiteUrlHostname}`);
        })
      )
      .catch((err) => console.log(`Couldnt download ${websiteUrlHostname}`));
  }
}

processLineByLine(file);
