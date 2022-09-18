import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

// which ever page/file is importing, has to call it with this specific name
export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});


    // useEffect does not support Async functions
    useEffect(

        // passing a function, which is executed when the component loads.
        () => {
            // make a REST API call (use, fetch & Wrap this in an Async function)
            const fetchMatches = async () => {
                // whatever you pass in this function, is executed when the component loads.
                const response = await fetch('http://localhost:8080/team/Sunrisers%20Hyderabad'); // why await? Because 'fetch' returns a promise.
                const data = await response.json();
                // console.log(data);
                setTeam(data);
            };
            fetchMatches();
        },
        []
        // above is dependency list --> you want the useEffect to run when the component loads.
    );

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      {/* <h1>Team Name</h1> */}
      <MatchDetailCard match = {team.matches[0]}/>
      {team.matches.slice(1).map(match => <MatchSmallCard match = {match} />)}
    </div>
  );
}

export default TeamPage;