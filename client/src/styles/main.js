import Slider from 'react-slick';

import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MainContent = styled.div`
  .playlist-name {
    width: 500px;
    color: var(--color9);
    font-size: 30px;
    display: block;
    position: relative;
    left: 310px;
    top: 440px;
  }
`;

export const StyledSlider = styled(Slider)`
  max-width: 1300px;
  min-width: 1120px;
  padding-bottom: 70px;
  top: 460px;
  left: 310px;
  display: flex;
  position: relative;
  background-color: var(--color1);

  .slick-list {
    width: 100%;
  }

  .slick-prev {
    left: -45px;
    top: 130px;

    &::before {
      content: '<';
    }
  }

  .slick-next {
    right: 20px;
    top: 130px;

    &::before {
      content: '>';
    }
  }

  .slick-prev::before,
  .slick-next::before {
    font-size: 40px;
    opacity: 0.5;
  }
`;
