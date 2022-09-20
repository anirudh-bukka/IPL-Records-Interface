import { TeamPage } from './pages/TeamPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/teams" element={<TeamPage /> }/>
        </Routes>

        <TeamPage />

      </Router>
      
    </div>
  );
}

export default App;
