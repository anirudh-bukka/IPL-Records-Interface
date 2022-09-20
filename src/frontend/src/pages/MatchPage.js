import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';

export const MatchPage = () => {

    // ---> we don't want all the matches of a team - would be sham. 
    // ---> group by YEAR: so URL would be something like this: http://localhost:3000/teams/Sunrisers%20Hyderabad/matches/2019 (suppose).


    // if(!team || !team.teamName) {
    //     return <h1>Team Not Found</h1>
    // }

    const [matches, setMatches] = useState([]);
    // const teamName = "Delhi Capitals";
    const { teamName, year } = useParams();

    useEffect (
        () => {
            const fetchMatches = async() => {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatches(data);
            };

            fetchMatches();
        }, []
    );

    return (
        <div className='MatchPage'>
            {/* <h1>{team.teamName}</h1>
            <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} />)} */}
            <h3>Match Page</h3>
            <h1>{teamName}</h1>
            {
                matches.map(match => <MatchDetailCard teamName={teamName} match={match} />)
            }
            
        </div>
    );
}