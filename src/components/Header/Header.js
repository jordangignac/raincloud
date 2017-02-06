import React from 'react';
import Audio from '../Audio/Audio';
import styles from './Header.scss';

const Header = ({ toggleNav }) => {
  return(
    <div className={styles.header}>
      <a className={styles.menuToggle} onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </a>
      <a>rain<span className={styles.blue}>///</span>cloud</a>
      <div className={styles.audioContainer}>
        <Audio />
      </div>
    </div>
  );
};

export default Header;
