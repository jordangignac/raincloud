import React from 'react';
import plyr from 'plyr';
import styles from './Audio.scss';

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnded = this.handleEnded.bind(this);
  }

  handleEnded(e) {
    this.props.nextTrack();
  }

  componentDidMount() {
    this.player = plyr.setup(styles.plyrInstance)[0];
    this.player.source({
      type: 'audio',
      sources: [{
        src: '/api/v1/tracks/' + this.props.selectedTrack.id,
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
          src: '/api/v1/tracks/' + nextProps.selectedTrack.id,
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
      <div className={styles.container} onEnded={this.handleEnded}>
        <audio className={styles.plyrInstance}></audio>
      </div>
    );
  }
}

export default Audio;
