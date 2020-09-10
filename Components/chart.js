import React from 'react'
import {confirmedDaily} from './api'
import {FormControl, NativeSelect} from '@material-ui/core'
import {Line, Bar} from 'react-chartjs-2'


const StatePicker = ({totalData:{states}, handleStateChange}) =>{
    return(
    states?<FormControl id="form">
        <NativeSelect defaultValue="" onChange={(e)=>handleStateChange(e.target.value)}>
            {states.map((p, i)=>{
                return(<option
                    key={i}
                    value={p}>
                        {p}
                </option>)
            })}
        </NativeSelect>
    </FormControl>
    :null)
}
export const Chart = ({totalData, keys, j, populations, State, stateData}) =>{
    if(keys){
        var i=keys.length-2;
        while(totalData.dates[keys[i]].delta.confirmed!==undefined&&totalData.dates[keys[i]].delta.recovered!==undefined&&i>0){
            if(totalData.dates[keys[i-1]].delta===undefined){
                i--;
            }
            i--;
        }
        j=i+1;
    }

    
    const line1 = totalData.cases_time_series?
    
    <Line
    
    data={
        {
            labels: totalData.cases_time_series.slice(totalData.cases_time_series.length-60, totalData.cases_time_series.length).map((p, i)=>{
                return(p.date)
            }),
            datasets: [   
                {
                    data:totalData.cases_time_series.slice(totalData.cases_time_series.length-60, totalData.cases_time_series.length).map((p, i)=>{
                
                        return(p.dailyconfirmed)
                    }),
                    label:'Confirmed',
                    borderColor: 'blue', 
                    backgroundColor: 'rgba(0, 0, 150, 0.1)'
            },
            {
                    data:totalData.cases_time_series.slice(totalData.cases_time_series.length-60, totalData.cases_time_series.length).map((p, i)=>{
                        return(p.dailyrecovered)
                    }),
                    label: 'Daily Recoveries',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 200, 0, 0.1)'    
            }
            ],
        }
    }
    />: totalData.dates&&keys.length?
    <Line
    data={
        
        {
            labels: keys.slice(j, keys.length-1).map((p, i)=>{
                return(p)
            }),
            datasets: [   
                {
                    data:keys.slice(j, keys.length-1).map((p, i)=>{
                        if(totalData.dates[p].delta===undefined)
                        return (null)
                        return(totalData.dates[p].delta.confirmed)
                    }),
                    label:'Confirmed',
                    borderColor: 'blue', 
                    backgroundColor: 'rgba(0, 0, 150, 0.1)'
            },
            {
                    data:keys.slice(j, keys.length-1).map((p, i)=>{
                        if(totalData.dates[p].delta===undefined)
                        return (null)
                        return(totalData.dates[p].delta.recovered)
                    }),
                    label: 'Daily Recoveries',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 200, 0, 0.1)'    
            }
            ],
        }
    }
    /> : null
    
    const line2 = totalData.cases_time_series?
    
    <Line
    
    data={
        {
            labels: totalData.cases_time_series.slice(totalData.cases_time_series.length-60, totalData.cases_time_series.length).map((p, i)=>{
                return(p.date)
            }),
            datasets: [   
                {
                    data:totalData.cases_time_series.slice(totalData.cases_time_series.length-60, totalData.cases_time_series.length).map((p, i)=>{
                
                        return(p.dailydeceased)
                    }),
                    label:'Daily Deaths',
                    borderColor: 'red', 
                    backgroundColor: 'rgba(100, 0, 0, 0.1)'
            }
            ],
        }
    }
    />: totalData.dates&&keys.length?
    <Line
    data={
        
        {
            labels: keys.slice(j, keys.length-1).map((p, i)=>{
                return(p)
            }),
            datasets: [   
                {
                    data:keys.slice(j, keys.length-1).map((p, i)=>{
                        if(totalData.dates[p].delta===undefined)
                        return (null)
                        return(totalData.dates[p].delta.deceased)
                    }),
                    label:' Daily Deaths',
                    borderColor: 'red', 
                    backgroundColor: 'rgba(100, 0, 0, 0.1)'
            }
            ],
        }
    }
    /> : null
    const line3 = totalData.tested?
    
    <Line
    
    data={
        {
            labels: totalData.tested.slice(totalData.tested.length-60, totalData.tested.length).map((p, i)=>{
                return(p.testedasof)
            }),
            datasets: [   
                {
                    data:totalData.tested.slice(totalData.tested.length-60, totalData.tested.length).map((p, i)=>{
                        
                        return(p.samplereportedtoday)
                    }),
                    label:'Samples Tested Daily',
                    borderColor: 'yellow', 
                    backgroundColor: 'rgba(25, 10, 5, 0.1)'
            }
            ],
        }
    }
    />: totalData.dates&&keys.length?
    <Line
    data={
        
        {
            labels: keys.slice(j, keys.length-1).map((p, i)=>{
                return(p)
            }),
            datasets: [   
                {
                    data:keys.slice(j, keys.length-1).map((p, i)=>{
                        if(totalData.dates[p].delta===undefined||totalData.dates[p].delta.tested<0)
                        return (null)
                        return(totalData.dates[p].delta.tested)
                    }),
                    label:'Samples Tested Daily',
                    borderColor: 'yellow', 
                    backgroundColor: 'rgba(25, 10, 5, 0.1)'
            },
            ]
        }
    }
    /> : null 
    const line4 = totalData.tested?
    
    <Line
    
    data={
        {
            labels: totalData.tested.slice(totalData.tested.length-60, totalData.tested.length).map((p, i)=>{
                return(p.testedasof)
            }),
            datasets: [   
                {
                    data:totalData.tested.slice(totalData.tested.length-60, totalData.tested.length).map((p, i)=>{
                        if(!p.totalsamplestested||!totalData.cases_time_series[i+124])
                        return null     
                        return(((totalData.cases_time_series[i+124].totalconfirmed/p.totalsamplestested)*100).toFixed(2))
                    }),
                    label:'Positivity Rate(Cumulative)',
                    borderColor: 'red' 
                   
            }
            ],
        }
    }
    />: totalData.dates&&keys.length?
    <Line
    data={
        
        {
            labels: keys.slice(j, keys.length-1).map((p, i)=>{
                return(p)
            }),
            datasets: [   
                {
                    data:keys.slice(j, keys.length-1).map((p, i)=>{
                        if(!totalData.dates[p].delta)
                        return null
                        if(!totalData.dates[p].total.tested||totalData.dates[p].delta.tested<0)
                        return (null)
                        return(((totalData.dates[p].total.confirmed/totalData.dates[p].total.tested)*100).toFixed(2))
                    }),
                    label:'Positivity Rate(Cumulative)',
                    borderColor: 'red'
                   
            },
            ]
        }
    }
    /> : null
const line5 = totalData.cases_time_series?
    <Line
    options={
        {
            title:{
                display:true,
                text:'Tests Per Million vs Cases Per Million',
                fontSize:15
            }
        }
    }
    data={
        {
            labels: totalData.cases_time_series.slice(totalData.cases_time_series.length-60, totalData.cases_time_series.length).map((p, i)=>{
                return(Math.floor(p.totalconfirmed/populations["Total"]*1000000))
            }),
            datasets: [   
                {
                    data:totalData.tested.slice(totalData.tested.length-60, totalData.tested.length).map((p, i)=>{
                        
                        return(p.testspermillion)
                    }),
                    label:'Tests Per Million',
                    borderColor: 'green' 
                   
            }
            ],
        }
    }
    />
    :
    totalData.dates?
    <Line
    options={
        {
            title:{
                display:true,
                text:'Tests Per Million vs Cases Per Million',
                fontSize:15
            }
        }
    }
    data={
        
        {
            labels: keys.slice(j, keys.length-1).map((p, i)=>{
                
                return(((totalData.dates[p].total.confirmed/populations[State])*1000000).toFixed(2))
            }),
            datasets: [   
                {
                    data:keys.slice(j, keys.length-1).map((p, i)=>{
                        return( Math.floor((totalData.dates[p].total.tested/populations[State]*1000000)) )
                    }),
                    label:'Tests Per Million',
                    borderColor: 'green'
                   
            },
            ]
        }
    }
    />
    :
    null
const bar1 = totalData.statewise? 
    
    <Bar
    data={
        {
            labels:
                totalData.statewise.slice(1, 12).map((p, i)=>{
                    return(p.statecode)
                }),
            datasets:[
                {
                    data: totalData.statewise.slice(1, 12).map((p, i)=>{
                        return(Math.floor((p.confirmed/populations[p.state])*1000000))
                    }),
                    label:'Cases Per Million',
                    borderColor:'blue',
                    backgroundColor:'rgba(0, 0, 50, 0.9)'
                },
                {
                    data: totalData.statewise.slice(1, 12).map((p, i)=>{
                     
                        const k = stateData[p.statecode].dates;
                        const key=Object.keys(k)
                        return(Math.floor((k[key[key.length-1]].total.tested/populations[p.state])*1000000))
                    }),
                    label:'Tests Per Million',
                    borderColor:'green',
                    backgroundColor:'rgba(0, 50, 0, 0.9)'
                },
            ]
        }
    }
    
    /> 
    : null
        return(
        <div id="outerContainer">
        <div className="row">
        <div className="chart">
            {line1
            //confirmedAndRecovered
            }
        </div>
        <div className="chart">
            {line2
            //deaths
            }
        </div>
        </div>
        <div className="row">
        <div className="chart">
            {line3
            //dailyTested
            }
        </div>
        <div className="chart">
            {line4
            //cumulativePositivityRate
            }
        </div>
        </div>
        <div className="row">
        <div className="bar">
            {line5
            //(cases vs tests) per million
            }
        </div>
        </div>

        <div className="row">
        <div className="bar">
            {bar1
            //statewise cases per million
            }
        </div>
        </div>
        </div>
    )
}
export default StatePicker