import React from 'react';
import styles from './TrackItem.scss';

const TrackItem = ({ id, selected, image, name, username, title, toggleTrack }) => {
  let itemClass = [styles.trackItem, selected ? styles.selected : ''].join(' ');
  return (
    <div className={itemClass} onClick={() => toggleTrack(id, username)}>
      <img src={image}></img>
      { selected ? <div className={styles.playBox}><div><div>▶</div></div></div> : '' }
    </div>
  );
};

export default TrackItem;
