import { TeamPage } from './pages/TeamPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import * as React from 'react';
import './App.css';
import { MatchPage } from './pages/MatchPage';
// import { ContactDesktop } from './pages/ContactsDesktop';
import { HomePage } from './pages/HomePage'

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
      {/* <ContactDesktop /> */}
      <Router>

        <Routes>
          <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
          <Route path="/teams/:teamName" element={<TeamPage />} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
        {/* <TeamPage /> */}
      </Router>
      
    </div>
  );
}

export default App;

// // Ooor use "Switch".
// <switch>
//   <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
//   <Route path="/teams/:teamName" element={<TeamPage />} />
// </switch>



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
