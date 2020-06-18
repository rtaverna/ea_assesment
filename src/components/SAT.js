import React from "react";
import LineChart from 'react-linechart';

const SAT = (props) =>  {
    const data = [
        {
            points: props.data,
            color: "black"
        }
    ]
    const margins = {top: 50, right: 15, bottom: 50, left: 70}
    
    return(
        <LineChart xLabel='Year'
                   yLabel='Overall Average SAT Score'
                   width={700}
                   height={500}
                   margins={margins}
                   data={data}
        />
    )
}


export default SAT