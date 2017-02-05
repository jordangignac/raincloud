import React from 'react';
import TrackItem from '../TrackItem/TrackItem';
import styles from './TrackList.scss';

const TrackList = ({ playlist }) => {
  return(
    <div className={styles.container}>
      <div className={styles.tracklist}>
        {playlist.map((e) => {
          return e.tracks.map((track) =>
            <TrackItem key={track.id} image={track.artwork_url} username={track.username} title={track.title}/>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
