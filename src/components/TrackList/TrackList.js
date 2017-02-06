import React from 'react';
import TrackItem from '../TrackItem/TrackItem';
import styles from './TrackList.scss';

const TrackList = ({ users, toggleTrack }) => {
  return(
    <div className={styles.container}>
      <div className={styles.tracklist}>
        {users.map((user) => {
          if (user.selected == true) return user.tracks.map((track) => (
            <TrackItem key={track.id} id={track.id} image={track.artwork_url} name={track.username} username={user.username} title={track.title} toggleTrack={toggleTrack}/>
          ));
        })}
      </div>
    </div>
  );
};

export default TrackList;
