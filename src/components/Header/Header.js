import React from 'react';
import styles from './Header.scss';

const Header = ({ brand, toggleNav }) => {
  return(
    <div className={styles.header}>
      <a className={styles.menuToggle} onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </a>
      <a>{brand}</a>
    </div>
  );
};

export default Header;
