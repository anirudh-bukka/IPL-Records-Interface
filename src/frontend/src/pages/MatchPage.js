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

    return (
        <div className='MatchPage'>
            {/* <h1>{team.teamName}</h1>
            <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} />)} */}
            <h1>Match Page Test</h1>
        </div>
    );
}