import Slider from 'react-slick';

import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MainContent = styled.div`
  padding-bottom: 520px;

  .playlist-name {
    width: 500px;
    color: var(--color9);
    font-size: 30px;
    display: block;
    position: relative;
    left: 330px;
    top: 440px;
  }
`;

export const StyledSlider = styled(Slider)`
  max-width: 1200px;
  min-width: 1120px;
  padding-bottom: 50px;
  top: 450px;
  left: 330px;
  display: flex;
  position: relative;

  .slick-list {
    width: 100%;
  }

  .slick-prev {
    left: -45px;
    top: 90px;

    &::before {
      content: '<';
    }
  }

  .slick-next {
    right: 0px;
    top: 90px;

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
