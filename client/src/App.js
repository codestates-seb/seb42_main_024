import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/GlobalStyle.css';
import './styles/variables.css';
import Nav from './components/Nav/Nav';
import NowPlaying from './components/player/NowPlaying';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
      <NowPlaying />
    </BrowserRouter>
  );
}

export default App;

// import './styles/GlobalStyle.css';
// import './styles/variables.css';
// import SearchBar from './components/SearchBar';

// function App() {
//   return (
//     <SearchBar />
//   );
// }

// export default App;
