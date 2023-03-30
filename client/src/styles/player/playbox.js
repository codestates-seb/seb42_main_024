import styled from 'styled-components';

export const PlayBoxWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color9);
`;
export const PlayBoxImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 11px;
  background-color: var(--color9);
  display: flex;
  justify-content: center;
  align-items: center;
  .Note {
    margin: auto;
    position: absolute;
    width: 45px;
    height: 45px;
    color: var(--color11);
    transform: rotate(15deg);
  }
`;
export const PlayBoxDataImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 11px;
  background-color: var(--color9);
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
`;
export const PlayBoxInfo = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  width: 150px;
`;
export const PlayBoxTitle = styled.span`
  position: absolute;
  width: 400px;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  font-size: 15px;
  font-family: var(--ft-pretendardBold);
  text-indent: 0;
`;
export const PlayBoxContent = styled.span`
  font-family: var(--ft-pretendardRegular);
  font-size: 12px;
`;
