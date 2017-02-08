import React from 'react';
import Audio from '../Audio/Audio';
import styles from './Header.scss';

const Header = ({ toggleNav, selectedTrack, nextTrack }) => {
  return(
    <div className={styles.header}>
      <a className={styles.menuToggle} onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </a>
      <a>rain<span className={styles.blue}>///</span>cloud</a>
      <div className={styles.audioContainer}>
        { selectedTrack ? <Audio selectedTrack={selectedTrack} nextTrack={nextTrack}/> : '' }
      </div>
    </div>
  );
};

export default Header;
