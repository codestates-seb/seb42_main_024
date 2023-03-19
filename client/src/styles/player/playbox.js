import styled from 'styled-components';

export const PlayBoxWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color9);
`;
export const PlayBoxImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 11px;
`;
export const PlayBoxInfo = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  width: 150px;
`;
export const PlayBoxTitle = styled.span`
  font-size: 15px;
  font-family: var(--ft-pretendardBold);
`;
export const PlayBoxContent = styled.span`
  font-family: var(--ft-pretendardRegular);
  font-size: 12px;
`;
