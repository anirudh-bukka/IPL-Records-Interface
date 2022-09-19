import { React } from 'react';

export const MatchDetailCard = ({teamName, match}) => {
    if(!match) return null;
    
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;

    return (
        <div className='MatchDetailCard'>
            <h3>Latest Matches</h3>
            <h4>Match Details</h4>
            {/* <h4>{match.team1} *vs* {match.team2}</h4> */}
            <h4> *vs* {otherTeam}</h4>
        </div>
    );
}