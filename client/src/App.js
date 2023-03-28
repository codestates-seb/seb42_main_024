import './styles/GlobalStyle.css';
import './styles/variables.css';
import { Route, Routes } from 'react-router-dom';

import Nav from './components/nav/Nav';
import NowPlaying from './components/player/NowPlaying';
import Liveroom from './pages/Liveroom';
import LiveroomList from './pages/LiveroomList';
import Main from './pages/Main';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/liveroomlist' element={<LiveroomList />} />
        <Route path='/liverooms/:liveroomid' element={<Liveroom />} />
      </Routes>
      <NowPlaying />
    </>
  );
}

export default App;
