import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MainContent = styled.div`
  .test {
    color: var(--color9);
    font-size: 30px;
    display: block;
    position: absolute;
    left: 310px;
    top: 410px;
  }
`;

export const StyledSlider = styled(Slider)`
  max-width: 1300px;
  min-width: 1120px;
  padding-bottom: 200px;
  top: 460px;
  left: 310px;
  display: flex;
  position: absolute;
  background-color: var(--color1);

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
