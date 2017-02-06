import React from 'react';
import UserItem from '../UserItem/UserItem';
import styles from './UserList.scss';

const UserList = ({ users, removeUser, togglePlaylist }) => {
  return(
    <div className={styles.userlist}>
      {users.map((user) => (
        <UserItem key={user.id} selected={user.selected} image={user.avatar_url} username={user.username} removeUser={removeUser} togglePlaylist={togglePlaylist}/>
      ))}
    </div>
  );
};

export default UserList;
