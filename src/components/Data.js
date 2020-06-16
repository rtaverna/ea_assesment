import React, {Component} from "react";
import axios from "axios";
import Programs from "./programs";
import Ethnicity from "./ethnicity";
import SAT from "./SAT";

class Data extends Component    {
    constructor() {
        super();
        this.state = {data: {}}
    }

    componentDidMount() {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const api = `https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&;2015.academics.program_available.assoc_or_bachelors=true&;2015.student.size__range=1..&;school.degrees_awarded.predominant__range=1..3&;school.degrees_awarded.highest__range=2..4&;id=240444&api_key=${API_KEY}`
        axios.get(api)
             .then((res) => {
                 const data = res.data.results[0]
                 console.log('data: ',data)
                 this.setState({data: data})
             })
             

    }
    render()    {
        let display;
        if (!this.state.data.id)   {
            display = <p>...</p>
        }   else    {
            let programData = this.state.data[2018].academics.program_percentage
            let programChartData = Object.keys(programData).map((program) => {return {'label': program, 'value': programData[program] } })
            let ethnicityData = this.state.data[2018].student.demographics.race_ethnicity
            let ethnicityChartData = Object.keys(ethnicityData).map((ethnicity) => {return {'label': ethnicity, 'value': ethnicityData[ethnicity] } })
            let valData = ethnicityChartData.filter((ethn) => ethn.value !== null)
            let years = Object.keys(this.state.data).filter(val => val.length === 4)
            let avgScore = years.map((year) => {return {'x': year, 'y': this.state.data[year].admissions.sat_scores.average.overall}})
            let validScores = avgScore.filter(score => score.y !== null)
            console.log(validScores)

            
            display =  (
               <>    
                <h1>{this.state.data.school.name}</h1>
                <h2>{this.state.data.school.alias}</h2>
                <p>{this.state.data.school.city}, {this.state.data.school.state} {this.state.data.school.zip}</p>
                <a href={"http://"+this.state.data.school.school_url}>Website</a>
                <p>{this.state.data[2018].student.size} Students</p>
                <div className="charts">
                    <Programs data={programChartData}/>
                    <Ethnicity data={valData}/>
                    {/* <SAT data={validScores}/> */}
                </div>
               </>
            )
        }
        return (
            <div>
                {display}    
            </div>
        )
    }
}

export default Data;