import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

import GoogleLogin from '../../assets/GoogleLogin.png';
import GoogleLoginHover from '../../assets/GoogleLoginHover.png';
import { ModalBox, ModalCloseButton, LoginButton } from '../../styles/modal';

const Modal = ({ setIsLogin, setModalOpen }) => {
  const [isHover, setIsHover] = useState(false);

  const loginHandler = () => {
    setIsLogin(true);
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalBox>
      <ModalCloseButton onClick={closeModal}>
        <IoClose className='close' />
      </ModalCloseButton>
      <span>Google 계정으로 간편 로그인</span>
      <LoginButton
        onClick={loginHandler}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}>
        {!isHover && <img src={GoogleLogin} alt='login hover' />}
        {isHover && <img src={GoogleLoginHover} alt='login hover' />}
      </LoginButton>
    </ModalBox>
  );
};

export default Modal;
