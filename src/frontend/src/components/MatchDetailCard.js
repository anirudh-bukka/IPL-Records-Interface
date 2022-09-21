import { React } from 'react';
import { Link } from 'react-router-dom';
import './MatchDetailCard.css';


export const MatchDetailCard = ({teamName, match}) => {
    if(!match) return null;

    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === match.matchWinner;

    return (
        <div className={isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card'}>
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
            <h3>Man Of The Match</h3>
            <p><i>{match.playerOfMatch}</i></p>
            </div>
            
        </div>
    );
}