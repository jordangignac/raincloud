import React from 'react';
import styles from './UserItem.scss';

const UserItem = ({ selected, image, username, removeUser, togglePlaylist }) => {
  let itemClass = [styles.userItem, selected ? styles.selected : ''].join(' ');
  return (
    <div className={itemClass} onClick={() => togglePlaylist(username)}>
      <div className={styles.profilePic}><img src={image}></img></div>
      <div className={styles.profileName}>{username}</div>
      <div className={styles.profileDelete} onClick={() => removeUser(username)}>✕</div>
    </div>
  );
};

export default UserItem;
