import styled from 'styled-components';

export const LiveroomGuideContianer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .swiper-wrapper {
    background-color: red !important;
  }
`;

export const LiveroomGuideImg = styled.img`
  width: 500px;
  height: ${(props) => props.logo || '500px'};
  border-radius: 20px;
`;

export const LiveroomGuideTextBox = styled.div`
  width: 500px;
  height: 120px;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: var(--color9);
  white-space: pre-wrap;
`;

export const LiveroomGuideImgContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 500px;
`;
