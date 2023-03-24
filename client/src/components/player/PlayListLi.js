import { useState } from 'react';
import ReactPlayer from 'react-player';

import {
  PlayListBox,
  PlayListLiContainer,
  PlayListLiCover,
  PlayListLiTitle,
  PlayListLiContentBox,
} from '../../styles/player/playlistli';
function PlayListLi({ data }) {
  //시간
  const [duration, setDuration] = useState(null);
  const minutes = Math.floor(duration / 60);
  const formattedSeconds = (duration % 60).toString().padStart(2, '0');

  return (
    <PlayListBox>
      <PlayListLiContainer>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${data.videoId}`}
          style={{ display: 'none' }}
          onDuration={setDuration}
        />
        <PlayListLiCover src={data.thumbnail} />
        <PlayListLiContentBox>
          <PlayListLiTitle>{data.title}</PlayListLiTitle>
        </PlayListLiContentBox>
        <p>{`${minutes}:${formattedSeconds}`}</p>
      </PlayListLiContainer>
    </PlayListBox>
  );
}

export default PlayListLi;
