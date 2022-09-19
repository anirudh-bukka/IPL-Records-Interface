import { React } from 'react';


export const MatchSmallCard = ({teamName, match}) => {
    if(!match) return null; 

    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;

    return (
        <div className = "MatchSmallCard">
            <p>*vs* {otherTeam}</p>

        </div>
    );
}