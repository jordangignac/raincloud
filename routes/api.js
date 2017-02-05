let express = require('express');
let axios = require('axios');

const token = process.env.SC_TOKEN || 'foobar';
const router = module.exports = express.Router();

router.get('/users/:username', (req, res) => {
  var url = 'http://api.soundcloud.com/users/' + req.params.username + '?client_id=' + token;

  axios.get(url)
    .then(({ data }) => {
      let user = {
        id: data.id,
        username: data.username.toLowerCase(),
        avatar_url: data.avatar_url
      };
      return res.json(user);
    })
    .catch(({ error }) => res.json({ error: error.status + ' : ' + error.statusText }));
});

router.get('/favorites/:username', (req, res) => {
  var url = 'http://api.soundcloud.com/users/' + req.params.username + '/favorites?client_id=' + token;

  axios.get(url)
    .then(({ data }) => {
      let tracks = [];
      for (var i = 0; i < data.length; i++) {
        let track = {
          id: data[i].id,
          title: data[i].title,
          username: data[i].user.username,
          artwork_url: data[i].artwork_url.replace('large.jpg', 't200x200.jpg'),
          uri: data[i].uri
        }
        tracks.push(track);
        if (i === data.length - 1) return res.json(tracks);
      }
    })
    .catch(({ error }) => res.json({ error: error.status + ' : ' + error.statusText }));
});
