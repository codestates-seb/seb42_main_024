import styled from 'styled-components';

export const LiveroomListContainer = styled.div`
  position: absolute;
  right: 0;
  width: calc(100vw - 250px);
  height: calc(100vh - 80px);
  .swiper {
    padding: 0 50px !important;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--color9) !important;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    color: var(--color9) !important;
  }
`;
export const PopularLiveroomList = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopularLiveroomListContainer = styled.div`
  width: 40%;
  min-width: 1200px;
  height: 400px;
`;
export const PopularLiveroomListTitle = styled.h2`
  font-size: 30px;
  color: var(--color9);
  margin-bottom: 20px;
`;
export const PopularLiveroomListMain = styled.div`
  width: 100%;
  height: 100%;
`;

export const AllLiveroomList = styled.div`
  padding-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const AllLiveroomListTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: var(--color9);
`;
export const AllLiveroomListContainer = styled.div`
  min-width: 1500px;
  max-width: 1800px;
  width: 90%;
`;
export const AllLiveroomListMain = styled.div`
  margin-top: 20px;
  width: 100%;
`;
