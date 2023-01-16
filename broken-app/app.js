const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/', function(req, res, next) {
  try {
    const fetchGithubInfo = async (url) => {
      console.log(`Fetching ${url}`)
      const githubInfo = await axios(url)
      return {
        name: githubInfo.data.name,
        bio: githubInfo.data.bio
      }
    }
    
    const fetchUserInfo = async (names) => {
      const requests = names.map((name) => {
        const url = `https://api.github.com/users/${name}`
        return fetchGithubInfo(url)
         .then((a) => {
          return a 
          })
      })
      return Promise.all(requests) 
    }
    
    
    return fetchUserInfo(req.body.developers)
     .then(a => res.send(JSON.stringify(a)))
    
  } catch (err){
    return next(err);
  }
});

app.listen(3000, function() {
  console.log(`Server starting on port 3000`);
});
