import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';
import './MatchPage.css';
import { YearSelector } from '../components/YearSelector';

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
        }, [teamName, year] // Because when we click an year from the list, it has to change -> render the corresponding information
    );

    return (
        <div className='MatchPage'>
            {/* <h1>{team.teamName}</h1>
            <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} />)} */}
            <div className='year-selector'>
                <h3>Years</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div className='TeamDetails'>
                <h3>Match Page</h3>
                <h1>{teamName}</h1>
                {
                    matches.map(match => <MatchDetailCard teamName={teamName} match={match} />)
                }
            </div>
            
        </div>
    );
}



// import { React, useEffect, useState } from 'react';
// import { MatchDetailCard } from '../components/MatchDetailCard';
// import { MatchSmallCard } from '../components/MatchSmallCard';
// import { useParams } from 'react-router-dom';
// import './MatchPage.css';


// export const MatchPage = () => {

//     // ---> we don't want all the matches of a team - would be sham. 
//     // ---> group by YEAR: so URL would be something like this: http://localhost:3000/teams/Sunrisers%20Hyderabad/matches/2019 (suppose).


//     // if(!team || !team.teamName) {
//     //     return <h1>Team Not Found</h1>
//     // }

//     const [matches, setMatches] = useState([]);
//     // const teamName = "Delhi Capitals";
//     const { teamName, year } = useParams();

//     useEffect (
//         () => {
//             const fetchMatches = async() => {
//                 const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
//                 const data = await response.json();
//                 setMatches(data);
//             };

//             fetchMatches();
//         }, []
//     );

//     return (
//         <div className='MatchPage'>
//             {/* <h1>{team.teamName}</h1>
//             <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
//             {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} />)} */}
//             <div className='year-selector'>

//             </div>
//             <div className='TeamDetails'>
//                 <h2>Match Page</h2>
//                 <h1>{teamName}</h1>
//                     {
//                         matches.map(match => <MatchDetailCard teamName={teamName} match={match} />)
//                     }
//             </div>
//         </div>
//     );
// }