import { IoClose } from 'react-icons/io5';

import GoogleLogin from '../../assets/GoogleLogin.png';
import GoogleLoginHover from '../../assets/GoogleLoginHover.png';
import {
  ModalBox,
  ModalCloseButton,
  LoginButton,
} from '../../styles/loginModal';

const LoginModal = ({ setLoginModalOpen, oAuthHandler }) => {
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <ModalBox>
      <ModalCloseButton onClick={closeLoginModal}>
        <IoClose className='close' />
      </ModalCloseButton>
      <span>Google 계정으로 간편 로그인</span>
      <LoginButton onClick={oAuthHandler}>
        <img src={GoogleLogin} alt='login hover' className='default' />
        <img src={GoogleLoginHover} alt='login hover' className='hover' />
      </LoginButton>
    </ModalBox>
  );
};

export default LoginModal;
