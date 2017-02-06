import React from 'react';
import styles from './Audio.scss';

class Audio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={styles.container}>
        Audio Player
      </div>
    );
  }
}

export default Audio;
