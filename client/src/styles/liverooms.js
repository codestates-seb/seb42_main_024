import styled from 'styled-components';

export const LiveroomsContainer = styled.div`
  height: ${(props) => +props.heightValue || 350}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LiveroomsThumbnailContianer = styled.div`
  width: 85%;
  height: 85%;
  position: relative;
  margin-bottom: 10px;
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
  :hover:not(.popular) {
    animation: rotate_image 6s linear infinite;
    transform-origin: 50% 50%;
  }
  &.popular {
    width: 80%;
    height: 80%;
  }
`;

export const LiveroomsThumbnail = styled.img`
  width: 100%;
  height: 100%;
  border: 10px solid var(--color9);
  border-radius: 50%;
  object-fit: cover;
  &.popular {
    border: 5px solid var(--color9);
    border-radius: 0%;
  }
`;

export const CDShape = styled.div`
  width: 25%;
  height: 25%;
  border: 10px solid var(--color8);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background-color: var(--color1);
`;

export const LiveroomsText = styled.div`
  width: 85%;
  height: 10%;
`;

export const LiveroomsTitle = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
`;

export const LiveroomsMain = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const LiveroomsOwner = styled.div``;

export const LiveroomsViewCountContianer = styled.div`
  display: flex;
  text-align: center;
  > svg {
    margin-top: 3px;
    margin-right: 10px;
  }
`;

export const LiveroomsViewCount = styled.div``;
