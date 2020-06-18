import React from "react";
import DonutChart from 'react-donut-chart';

const Ethnicity = (props) => {
    return(
        <DonutChart
            data={props.data}
        />
    )
}

export default Ethnicity