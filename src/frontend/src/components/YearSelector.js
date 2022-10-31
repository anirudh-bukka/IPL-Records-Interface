import React from "react";

export const YearSelector = () => {

    let years = [];
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR;
    
    for(let i = startYear; i <= endYear; i++) {
        years.push(i);
    }

}