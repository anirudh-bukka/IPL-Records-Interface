import { TeamPage } from './pages/TeamPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import * as React from 'react';
import './App.css';

function App() {
  // function Profile () {
  //   const [user, setUser] = React.useState(null)
  //   const { handle } = useParams()
  
  //   React.useEffect(() => {
  //     getProfile(handle)
  //       .then(setUser)
  //   }, [handle])
  
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route path="/teams/:teamName" /> */}
          {/* <Route path="/teams" element={<TeamPage /> }/> */}
          <Route path="/teams/:teamName" element={<TeamPage />} />
        </Routes>

        <TeamPage />

      </Router>
      
    </div>
  );
}

export default App;
