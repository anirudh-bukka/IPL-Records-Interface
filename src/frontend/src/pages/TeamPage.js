import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';
import './TeamPage.css';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';

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
                <PieChart
                    data={[
                        {title: 'Lost', value: team.totalMatches - team.totalWins, color: '#ff0000'},
                        {title: 'Won', value: team.totalWins, color: '#04fd89'},
                    ]}
                /> 
                Win / Loss
            </div>
            <div className='match-detail-block'>
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            </div>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} />)}
            <div className='more-link'>
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More</Link>
            </div>
        </div>
    );
}