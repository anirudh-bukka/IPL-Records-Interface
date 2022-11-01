import React from "react";
import { Link } from 'react-router-dom';

export const YearSelector = ({teamName}) => {

    let years = [];
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR;
    
    for(let i = startYear; i <= endYear; i++) {
        years.push(i);
    }

    return (
        <div className="LinksList">
            { years.map(year => 
            <div className="EachYear"> <li>
                <Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link>
            </li> </div>
            ) }
        </div>
    )

}