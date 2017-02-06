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
      navOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  togglePlaylist(username) {
    let users = this.state.users;
    let index = users.findIndex(o => o.username == username);
    if (index >= 0) {
      users[index].selected = !users[index].selected;
      this.setState({ users: users });
    }
  }

  addUser(username) {
    let url = '/api/v1/users/' + username;
    let found = this.state.users.find(o => o.username == username);
    let newUser = { };

    if (!found) {
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
  }

  removeUser(username) {
    let users = this.state.users;
    let index = users.findIndex(o => o.username == username);
    if (index >= 0) {
      users.splice(index, 1);
      this.setState({ users: users });
    }
  }

  render() {
    let contentWrapper = [styles.contentWrapper, this.state.navOpen ? styles.navOpen : ''].join(' ');
    return(
      <div className={styles.container}>
        <div className={styles.sideWrapper}>
          <Sidebar users={this.state.users} addUser={this.addUser} removeUser={this.removeUser} togglePlaylist={this.togglePlaylist}/>
        </div>
        <div className={contentWrapper}>
          <Header toggleNav={this.toggleNav}/>
          <TrackList users={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;
