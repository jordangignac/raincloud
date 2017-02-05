import React from 'react';
import UserItem from '../UserItem/UserItem';
import styles from './UserList.scss';

const UserList = ({ users, removeUser, addPlaylist }) => {
  return(
    <div className={styles.userlist}>
      {users.map((user) => (
        <UserItem key={user.id} image={user.avatar_url} username={user.username} removeUser={removeUser} addPlaylist={addPlaylist}/>
      ))}
    </div>
  );
};

export default UserList;
