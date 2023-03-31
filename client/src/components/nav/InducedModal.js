import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

import GoogleLogin from '../../assets/GoogleLogin.png';
import GoogleLoginHover from '../../assets/GoogleLoginHover.png';
import Logo from '../../assets/Logo.png';
import {
  InducedModalContainer,
  InducedModalBackdrop,
  InducedModalCloseBtn,
  InducedModalLoginBtn,
  InducedModalView,
  LogoBox,
} from '../../styles/inducedModal';

const InducedModal = ({ setInducedModalOpen, oAuthHandler }) => {
  const [isHover, setIsHover] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);

  const closeInducedModal = () => {
    setIsFadeOut(true);
    setTimeout(() => {
      setInducedModalOpen(false);
      setIsFadeOut(false);
    }, 300);
  };

  return (
    <InducedModalContainer>
      <InducedModalBackdrop onClick={closeInducedModal} isFadeOut={isFadeOut}>
        <InducedModalView>
          <InducedModalCloseBtn onClick={closeInducedModal}>
            <IoClose className='close' />
          </InducedModalCloseBtn>
          <LogoBox>
            <img className='modal-logo' src={Logo} alt='logo' />
          </LogoBox>
          <span className='induce-message'>
            로그인하시면 더 많은 음악과
            <br />
            라이브 방송을 즐길 수 있어요!
          </span>
          <InducedModalLoginBtn
            onClick={oAuthHandler}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}>
            {!isHover && <img src={GoogleLogin} alt='login hover' />}
            {isHover && <img src={GoogleLoginHover} alt='login hover' />}
          </InducedModalLoginBtn>
        </InducedModalView>
      </InducedModalBackdrop>
    </InducedModalContainer>
  );
};

export default InducedModal;
