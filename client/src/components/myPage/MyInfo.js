import { useSelector } from 'react-redux';

import { MyInfoContainer } from '../../styles/myPage';
const MyInfo = () => {
  const user = useSelector((state) => state.user);
  return (
    <MyInfoContainer>
      <img src={user.picture} alt='user profile' className='userPic' />
      <div className='info'>
        <div className='name'>{user.nickname}</div>
        <div className='email'>{user.email}</div>
      </div>
    </MyInfoContainer>
  );
};

export default MyInfo;
