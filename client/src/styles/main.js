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
    left: 315px;
    top: 430px;
  }
`;

export const StyledSlider = styled(Slider)`
  max-width: 1070px;
  min-width: 1000px;
  padding-bottom: 50px;
  top: 440px;
  left: 315px;
  display: flex;
  position: relative;

  .slick-list {
    width: 100%;
  }

  .slick-prev {
    left: -40px;
    top: 80px;

    &::before {
      content: '<';
    }
  }

  .slick-next {
    right: -20px;
    top: 80px;

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
