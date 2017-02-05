import React from 'react';
import styles from './UserItem.scss';

const UserItem = ({ image, username, removeUser, addPlaylist }) => {
  return (
    <div className={styles.userItem} onClick={() => addPlaylist(username)}>
      <div className={styles.profilePic}><img src={image}></img></div>
      <div className={styles.profileName}>{username}</div>
      <div className={styles.profileDelete} onClick={() => removeUser(username)}>✕</div>
    </div>
  );
};

export default UserItem;
