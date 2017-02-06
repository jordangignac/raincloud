import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Audio.scss';
import plyr from 'plyr';

class Audio extends React.Component {
  componentDidMount() {
    this.player = plyr.setup(styles.plyrInstance)[0];
    this.player.source({
      type: 'audio',
      sources: [{
        src: '/api/v1/tracks/' + this.props.selectedTrack,
        type: 'audio/mp3'
      }]
    });
    this.player.play();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTrack !== nextProps.selectedTrack) {
      this.player.source({
        type: 'audio',
        sources: [{
          src: '/api/v1/tracks/' + nextProps.selectedTrack,
          type: 'audio/mp3'
        }]
      });
      this.player.play();
    }
  }

  componentWillUnmount() {
    this.player.destroy();
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
