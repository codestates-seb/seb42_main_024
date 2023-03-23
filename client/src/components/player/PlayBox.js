import { IoMdMusicalNote } from 'react-icons/io';
import { useSelector } from 'react-redux';

import {
  PlayBoxImg,
  PlayBoxWarp,
  PlayBoxDataImg,
  PlayBoxInfo,
  PlayBoxTitle,
  PlayBoxContent,
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
          <PlayBoxTitle>{playData?.musicTitle}</PlayBoxTitle>
          <PlayBoxContent>{playData?.artist}</PlayBoxContent>
        </PlayBoxInfo>
      ) : (
        <PlayBoxInfo>
          <PlayBoxTitle>선택해주세요</PlayBoxTitle>
          <PlayBoxContent>비어있습니다</PlayBoxContent>
        </PlayBoxInfo>
      )}
    </PlayBoxWarp>
  );
}

export default PlayBox;
