import { IoMdMusicalNote } from 'react-icons/io';
import { useSelector } from 'react-redux';

import {
  PlayBoxImg,
  PlayBoxWarp,
  PlayBoxDataImg,
  PlayBoxInfo,
  PlayBoxTitle,
} from '../../styles/player/playbox';
function PlayBox() {
  const playIdx = useSelector((state) => state?.currentSongIdx);
  const playData = useSelector((state) => state?.currentSongList?.[playIdx]);
  return (
    <PlayBoxWarp>
      {playData?.thumbnail ? (
        <PlayBoxDataImg src={playData?.thumbnail} />
      ) : (
        <PlayBoxImg>
          <IoMdMusicalNote className='Note' />
        </PlayBoxImg>
      )}
      {playData ? (
        <PlayBoxInfo>
          <PlayBoxTitle>{playData?.title}</PlayBoxTitle>
        </PlayBoxInfo>
      ) : (
        <PlayBoxInfo>
          <PlayBoxTitle>선택해주세요</PlayBoxTitle>
        </PlayBoxInfo>
      )}
    </PlayBoxWarp>
  );
}

export default PlayBox;
