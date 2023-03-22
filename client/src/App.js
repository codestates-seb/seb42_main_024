import './styles/GlobalStyle.css';
import './styles/variables.css';
import Nav from './components/Nav/Nav';
import NowPlaying from './components/player/NowPlaying';
function App() {
  return (
    <div>
      <Nav />
      <NowPlaying />
    </div>
  );
}

export default App;
