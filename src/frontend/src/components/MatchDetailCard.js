import { React } from 'react';
import { Link } from 'react-router-dom';
import './MatchDetailCard.css';


export const MatchDetailCard = ({teamName, match}) => {
    if(!match) return null;

    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;

    return (
        <div className='MatchDetailCard'>
            <div>
                <span className='vs'>vs</span>
                <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
                <h3 className='match-date'>{match.date}</h3>
                <h3 className='match-venue'>at {match.venue}, {match.city}</h3>
                <h3 className='match-result'>{match.matchWinner}  won by {match.resultMargin} {match.result}</h3>
            </div>
            <div className='innings'>
            <h3>First Innings</h3>
            <p>{match.team1}</p>
            <h3>Secong Innings</h3>
            <p>{match.team2}</p>
            </div>
            
        </div>
    );
}