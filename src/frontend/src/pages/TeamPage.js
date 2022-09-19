import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// which ever page/file is importing, has to call it with this specific name
export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const {teamName} = useParams();
    console.log(teamName);

    

    // useEffect does not support Async functions
    useEffect(

        // passing a function, which is executed when the component loads.
        () => {
          // make a REST API call (use, fetch & Wrap this in an Async function)
          const fetchMatches = async () => {
            // ---> whatever you pass in this function, is executed when the component loads. <---
            const response = await fetch('http://localhost:8080/team/Sunrisers Hyderabad'); // why await? Because 'fetch' returns a promise.
            // const response = await fetch(`http://localhost:8080/team/${teamName}`);
            const data = await response.json();
            setTeam(data);
          };
            fetchMatches();
        }, []
        // above is dependency list --> you want the useEffect to run when the component loads.
    );
  
  if (!team || !team.teamName) {
    return <h1>Team Not Found</h1>
  }

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard teamName = {team.teamName} match = {team.matches[0]}/>
      {team.matches.slice(1).map(match => <MatchSmallCard teamName = {team.teamName}  match = {match} />)}
    </div>
  );
}

export default TeamPage;
