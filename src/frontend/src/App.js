import './App.css';
import TeamPage from './pages/TeamPage';
import {Routes, Route} from 'react-router-dom';
// import { useParams } from 'react-router-dom';


function App() {
  return (

      <Routes>
        <Route path = "/teams/:teamName">
          <TeamPage />
        </Route>
      </Routes>

  );
}

export default App;