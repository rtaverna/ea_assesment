import React, {Component} from "react";
// import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import LineChart from 'react-linechart';

const SAT = (props) =>  {
    
    // const options = {
    //     animationEnabled: true,
    //     exportEnabled: true,
    //     theme: "light2", 
    //     title:{
    //         text: "Overall Average SAT Score by Year"
    //     },
    //     axisY: {
    //         title: "Average SAT score",
    //         includeZero: false
    //     },
    //     axisX: {
    //         title: "Year",
    //         interval: 2
    //     },
    //     data: [{
    //         type: "line",
    //         dataPoints: this.props.data
    //     }]
    // }

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