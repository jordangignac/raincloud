import React from 'react';
import UserList from '../UserList/UserList';
import styles from './Sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handleInput = this.handleInput.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  handleKey(e) {
    if (e.key == 'Enter') this.handleAdd();
  }

  handleAdd(e) {
    this.props.addUser(this.state.input);
    this.setState({ input: '' });
  }

  render() {
    return(
      <div className={styles.sidebar}>
        <div className={styles.search}>
          <a onClick={this.handleAdd}>⚲</a>
          <input value={this.state.input} onChange={this.handleInput} onKeyPress={this.handleKey}/>
        </div>
        <UserList users={this.props.users} removeUser={this.props.removeUser} togglePlaylist={this.props.togglePlaylist}/>
      </div>
    );
  }
}

export default Sidebar;
