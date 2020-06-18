import React, {Component} from "react";
import DonutChart from 'react-donut-chart';

const Programs = (props) => {
    return(
        <DonutChart
            data={props.data}
          
        />
    )
}

export default Programs