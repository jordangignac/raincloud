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
      playlist: [],
      navOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  addPlaylist(username) {
    let user = this.state.users.find(o => o.username == username);
    if (user) this.setState({ playlist: [{ username: user.username, tracks: user.tracks }] });
  }

  addUser(username) {
    let url = 'http://localhost:3000/api/v1/users/' + username;
    let found = this.state.users.find(o => o.username == username);
    let newUser = {};

    if (!found && username) {
      axios.get(url)
        .then(({ data }) => {
          if (data.error) return;
          newUser = data;
          url = url.replace('/users/', '/favorites/');
          return axios.get(url);
        })
        .then(({ data }) => {
          if (data.error) return;
          newUser.tracks = data;
          newUser.selected = false;
          this.setState({ users: this.state.users.concat(newUser) });
        });
    }
  }

  removeUser(username) {
    let users = this.state.users;
    let playlist = this.state.playlist;

    let index = users.findIndex(o => o.username == username);
    if (index !== -1) {
      users.splice(index, 1);
      this.setState({ users: users });
    }

    index = playlist.findIndex(o => o.username == username);
    if (index !== -1) {
      playlist.splice(index, 1);
      this.setState({ playlist: playlist });
    }
  }

  render() {
    let contentWrapper = [styles.contentWrapper, this.state.navOpen ? styles.navOpen : ''].join(' ');
    return(
      <div className={styles.container}>
        <div className={styles.sideWrapper}>
          <Sidebar users={this.state.users} addUser={this.addUser} removeUser={this.removeUser} addPlaylist={this.addPlaylist}/>
        </div>
        <div className={contentWrapper}>
          <Header toggleNav={this.toggleNav}/>
          <TrackList playlist={this.state.playlist}/>
        </div>
      </div>
    );
  }
}

export default App;
