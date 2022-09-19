import { TeamPage } from './pages/TeamPage';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <TeamPage />
      </Router>
    </div>
  );
}

export default App;
