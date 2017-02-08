import React from 'react';
import axios from 'axios';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import TrackList from './TrackList/TrackList';
import styles from './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      tracks: [],
      selectedTrack: null,
      navOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleTrack = this.toggleTrack.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  toggleTrack(id, username) {
    let tracks = this.state.tracks;
    let index = tracks.findIndex(o =>o.id == id && o.username == username);

    if (this.state.selectedTrack) {
      if (id == this.state.selectedTrack.id && this.state.selectedTrack.username == username) {
        tracks[index].selected = false;
        return this.setState({ tracks: tracks, selectedTrack: null });
      }

      let oldIndex = tracks.findIndex(o => o.id == this.state.selectedTrack.id && o.username == this.state.selectedTrack.username);
      if (oldIndex >= 0) tracks[oldIndex].selected = false;
    }

    tracks[index].selected = true;
    this.setState({ tracks: tracks, selectedTrack: { id: id, username: username } });
  }

  togglePlaylist(username) {
    let users = this.state.users;
    let index = users.findIndex(o => o.username == username);

    users[index].selected ? this.removePlaylist(username) : this.addPlaylist(users[index]);
    users[index].selected = !users[index].selected;

    this.setState({ users: users });
  }

  removePlaylist(username) {
    this.setState({ tracks: this.state.tracks.filter(o => o.username !== username) });
  }

  addPlaylist(user) {
    for (let i = 0; i < user.tracks.length; i++) {
      if (this.state.selectedTrack && user.tracks[i].id == this.state.selectedTrack.id && user.tracks[i].username == this.state.selectedTrack.username) {
        user.tracks[i].selected = true;
      } else {
        user.tracks[i].selected = false;
      }
      user.tracks[i].username = user.username;
    }
    this.setState({ tracks: this.state.tracks.concat(user.tracks) });
  }

  nextTrack() {
    let index = this.state.tracks.findIndex(o =>o.id == this.state.selectedTrack.id && o.username == this.state.selectedTrack.username);

    if (++index == this.state.tracks.length) return this.setState({ selectedTrack: null });

    this.toggleTrack(this.state.tracks[index].id, this.state.tracks[index].username);
  }

  removeUser(username) {
    this.removePlaylist(username)
    this.setState({ users: this.state.users.filter(o => o.username !== username) });
  }

  addUser(username) {
    let url = '/api/v1/users/' + username;
    let newUser = {};

    if (!username) return;
    if (this.state.users.find(o => o.username == username)) return;

    axios.get(url)
      .then(({ data }) => {
        newUser = data;
        url = url.replace('/users/', '/favorites/');
        return axios.get(url);
      })
      .then(({ data }) => {
        newUser.tracks = data;
        newUser.selected = false;
        this.setState({ users: this.state.users.concat(newUser) });
      })
      .catch((error) => console.error(error.stack));
  }

  render() {
    let contentWrapper = [styles.contentWrapper, this.state.navOpen ? styles.navOpen : ''].join(' ');
    return(
      <div className={styles.container}>
        <div className={styles.sideWrapper}>
          <Sidebar users={this.state.users} addUser={this.addUser} removeUser={this.removeUser} togglePlaylist={this.togglePlaylist}/>
        </div>
        <div className={contentWrapper}>
          <Header toggleNav={this.toggleNav} selectedTrack={this.state.selectedTrack} nextTrack={this.nextTrack}/>
          <TrackList tracks={this.state.tracks} toggleTrack={this.toggleTrack}/>
        </div>
      </div>
    );
  }
}

export default App;
