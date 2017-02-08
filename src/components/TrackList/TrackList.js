import React from 'react';
import TrackItem from '../TrackItem/TrackItem';
import styles from './TrackList.scss';

const TrackList = ({ tracks, toggleTrack }) => {
  return(
    <div className={styles.container}>
      <div className={styles.tracklist}>
        { tracks.map((track) => (
          <TrackItem key={track.id} id={track.id} selected={track.selected} image={track.artwork_url}
            name={track.name} username={track.username} title={track.title} toggleTrack={toggleTrack}/>
        )) }
      </div>
    </div>
  );
};

export default TrackList;
