import React from 'react';
import plyr from 'plyr';
import ReactDOM from 'react-dom';
import styles from './Audio.scss';

class Audio extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.player = plyr.setup(styles.plyrInstance)[0];
  }

  render() {
    return(
      <div className={styles.container}>
        <audio className={styles.plyrInstance}></audio>
      </div>
    );
  }
}

export default Audio;
