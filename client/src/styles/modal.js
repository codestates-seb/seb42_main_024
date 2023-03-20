import styled from 'styled-components';

export const ModalBox = styled.div`
  width: 250px;
  height: 120px;
  z-index: 99;
  background-color: var(--color1);
  position: absolute;
  top: -5px;
  left: -15px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0;

  .close {
    color: var(--color9);
    font-size: 15px;
  }

  span {
    color: var(--color9);
  }
`;

export const ModalCloseButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: inherit;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const LoginButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: inherit;
`;
