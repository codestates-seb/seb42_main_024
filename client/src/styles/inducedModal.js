import styled from 'styled-components';

export const InducedModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export const InducedModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  z-index: 100;
  cursor: grab;
  animation: ${({ isFadeOut }) =>
    isFadeOut
      ? 'fadeOut 0.3s ease-out forwards'
      : 'fadeIn 0.3s ease-in forwards'};
`;

export const InducedModalCloseBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: inherit;
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: rgba(0, 0, 0, 0);

  .close {
    color: var(--color9);
    font-size: 15px;
  }
`;

export const LogoBox = styled.div`
  width: 240px;
  height: 58px;
  position: relative;
  top: -35px;

  .modal-logo {
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
  }
`;

export const InducedModalLoginBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: inherit;
  position: relative;
  top: 35px;
`;

//eslint-disable-next-line no-unused-vars
export const InducedModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  width: 400px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: grab;

  .induce-message {
    color: var(--color9);
    font-size: 20px;
    position: relative;
    top: -10px;
  }
`;
