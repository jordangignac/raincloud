let express = require('express');
let request = require('request');

const token = process.env.SC_TOKEN || 'foobar';
const router = module.exports = express.Router();

router.get('/users/:username', (req, res) => {
  var url = 'http://api.soundcloud.com/users/' + req.params.username + '?client_id=' + token;

  request(url, (error, response, body) => {
    if (error) { console.error(error); return res.sendStatus(500); }

    let data = JSON.parse(body);
    if (data.errors) return res.json(data.errors[0]);

    let user = {
      id: data.id,
      username: data.username.toLowerCase(),
      avatar_url: data.avatar_url
    }

    res.json(user);
  });
});

router.get('/favorites/:username', (req, res) => {
  var url = 'http://api.soundcloud.com/users/' + req.params.username + '/favorites?client_id=' + token;

  request(url, (error, response, body) => {
    if (error) { console.error(error); return res.sendStatus(500); }

    let tracks = [];
    let data = JSON.parse(body);
    if (data.errors) return res.json(data.errors[0]);

    for (let i = 0; i < data.length; i++) {
      let track = {
        id: data[i].id,
        title: data[i].title,
        name: data[i].user.username,
        artwork_url: data[i].artwork_url.replace('large.jpg', 't200x200.jpg'),
        uri: data[i].uri
      }
      tracks.push(track);
      if (i == data.length - 1) res.json(tracks);
    }
  });
});

router.get('/tracks/:id', (req, res) => {
  var url = 'http://api.soundcloud.com/tracks/' + req.params.id + '/stream?client_id=' + token;
  request(url).pipe(res);
});
