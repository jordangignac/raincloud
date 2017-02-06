import React from 'react';
import styles from './TrackItem.scss';

const TrackItem = ({ id, image, username, title, toggleTrack }) => {
  return (
    <div className={styles.trackItem} onClick={() => toggleTrack(id)}>
      <img src={image}></img>
    </div>
  );
};

export default TrackItem;
