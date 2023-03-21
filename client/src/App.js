import { Routes, Route } from 'react-router-dom';

import './styles/GlobalStyle.css';
import './styles/variables.css';
import Nav from './components/Nav/Nav';
import NowPlaying from './components/player/NowPlaying';
import Main from './pages/Main';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
      <NowPlaying />
    </>
  );
}

export default App;
