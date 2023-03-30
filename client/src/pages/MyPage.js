import MyInfo from '../components/myPage/MyInfo';
import MyLists from '../components/myPage/MyLists';
import { MyPageContainer } from '../styles/myPage';

const MyPage = () => {
  return (
    <MyPageContainer>
      <MyInfo />
      <MyLists />
    </MyPageContainer>
  );
};

export default MyPage;
