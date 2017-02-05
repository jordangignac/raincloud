import React from 'react';
import styles from './TrackItem.scss';

const TrackItem = ({ image, username, title }) => {
  return (
    <div className={styles.trackItem}>
      <img src={image}></img>
    </div>
  );
};

export default TrackItem;
