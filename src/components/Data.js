import React, {Component} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";
import Programs from "./programs";
import Ethnicity from "./ethnicity";
import SAT from "./SAT";


class Data extends Component    {
    constructor() {
        super();
        this.state = {data: {}}
        this.printDocument = this.printDocument.bind(this)
        this.downloadTxtFile = this.downloadTxtFile.bind(this)
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

    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("school-data.pdf");
          });
    }

    downloadTxtFile = () => {
        const element = document.createElement('a');
        const file = new Blob([document.getElementById('info').value],    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
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
                const downloadData = "text/json;charset=utf-8," + JSON.stringify(this.state.data.school);
            
                display =  (
                    <div id="divToPrint" >
                        <div id="info"className="info">  
                            <a href={"http://"+this.state.data.school.school_url}><h1>{this.state.data.school.name}</h1></a>
                            <h2>{this.state.data.school.alias}</h2>
                            <h3 id="address">{this.state.data.school.city}, {this.state.data.school.state} {this.state.data.school.zip}</h3>
                            <p>In 2018, <span id="population">{this.state.data[2018].student.size}</span> students were enrolled in {this.state.data.school.name}<br />
                            Explore data by category below</p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                        <div className="charts">
                            <Tabs className= "tabs"width={"fit-content"}>
                                <TabList>
                                    <Tab>Program Enrollment</Tab>
                                    <Tab>Ethnicity</Tab>
                                    <Tab>SAT</Tab>
                                </TabList>
                                <TabPanel>
                                    <Programs data={programChartData}/>
                                </TabPanel>
                                <TabPanel>
                                    <Ethnicity data={valData}/>
                                </TabPanel>
                                <TabPanel>
                                    <SAT data={validScores}/>
                                </TabPanel>
                            </Tabs>  
                        </div>
                        <div className="buttons">
                            <button onClick={this.printDocument}>Save as PDF</button>
                            <button onClick={() => window.print()}>Print</button>                    
                            <a href={`data: ${downloadData}`} download="data.json"><button>Download Data</button></a>
                        </div>
                    </div>
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