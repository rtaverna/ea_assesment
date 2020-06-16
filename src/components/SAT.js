import React, {Component} from "react";
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;



const SAT = (props) => {
    let options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", 
        title:{
            text: "Overall Average SAT Score by Year"
        },
        axisY: {
            title: "Average SAT score",
            includeZero: false
        },
        axisX: {
            title: "Year",
            interval: 2
        },
        data: [{
            type: "line",
            dataPoints: props.data
        }]
    }
    
    return(
        <CanvasJSChart options={options}/>
    )
}

export default SAT