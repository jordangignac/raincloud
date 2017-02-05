import React from 'react';
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
    </div>
  );
};

export default Header;
