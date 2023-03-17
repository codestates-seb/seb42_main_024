import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';

import Modal from './Modal';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';

import { NavContainer, NavFooter } from '../../styles/nav';

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const logoutHandler = () => {
    setUser(null);
    setIsLogin(false);
  };

  return (
    <NavContainer>
      <div className='nav-logo'>
        <FaQuestion className='icons-logo' />
        <span>LOGO</span>
      </div>
      {isLogin ? (
        <NavLogin user={user} logoutHandler={logoutHandler} />
      ) : (
        <>
          <NavLogout openModal={openModal} />
          {modalOpen && !isLogin && (
            <Modal setIsLogin={setIsLogin} setModalOpen={setModalOpen} />
          )}
        </>
      )}
      <NavFooter>
        <p>CodeStates SEB 42th</p>
      </NavFooter>
    </NavContainer>
  );
};

export default Nav;
