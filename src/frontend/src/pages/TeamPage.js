import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';
import './TeamPage.css';

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const { teamName } = useParams();


    useEffect(
        () => {
            const fetchMatches = async () => {
                // const response = await fetch('http://localhost:8080/team/Sunrisers Hyderabad');
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
                // console.log(data);
            };

            fetchMatches();

        },[teamName]
    );

    if(!team || !team.teamName) {
        return <h1>Team Not Found</h1>
    }

    return (
        <div className='TeamPage'>
            <div className='team-name-block'>
                <h1 className='team-name'>{team.teamName}</h1>
            </div>
            <div className='win-loss-block'>
                Win / Loss
            </div>
            <div className='match-detail-block'>
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            </div>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} />)}
            <div><a href='#'>More</a></div>
        </div>
    );
}