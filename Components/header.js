
import React from 'react'



const Header = ({totalData, keys}) => {
    
   
    return(
        totalData.statewise?
    <div id="header">  
     <div id="p1"><h4>Total Confirmed: {totalData.statewise[0].confirmed}</h4>
    <h5 className='new'>
        +{totalData.statewise[0].deltaconfirmed}
    </h5>
    </div>
    <div id="p3"><h4>Total Recovered: {totalData.statewise[0].recovered}</h4>
    <h5 className='new'>
        +{totalData.statewise[0].deltarecovered}
    </h5>
    </div>
    <div id="p2"><h4>Total Active: {totalData.statewise[0].active}</h4>
    </div>
    <div id="p4"><h4>Total Deaths: {totalData.statewise[0].deaths}</h4>
    <h5 className='new'>
        +{totalData.statewise[0].deltadeaths}
    </h5>
    </div>
    <div id="p5">
    <h4>
        Total Tests: {totalData.tested[totalData.tested.length-1].totalsamplestested}
    </h4>
    </div>
    </div>
        :
    totalData.dates&&keys.length?
    
    <div id="header">
    
    <div id="p1"><h4>Total Confirmed: {totalData.dates[keys[keys.length-1]].total.confirmed}</h4>
    <h5 className='new'>
        {
        totalData.dates[keys[keys.length-1]].delta?totalData.dates[keys[keys.length-1]].delta.confirmed?
        '+ ' + totalData.dates[keys[keys.length-1]].delta.confirmed : null : null
        }
    </h5>
    </div>
    <div id="p3"><h4>Total Recovered: {totalData.dates[keys[keys.length-1]].total.recovered}</h4>
    <h5 className='new'>
        {totalData.dates[keys[keys.length-1]].delta?
        totalData.dates[keys[keys.length-1]].delta.recovered?
        '+ ' + totalData.dates[keys[keys.length-1]].delta.recovered
        : null : null}
    </h5>
    </div>
    <div id="p2"><h4>Total Active: 
        {totalData.dates[keys[keys.length-1]].total.migrated?
        totalData.dates[keys[keys.length-1]].total.confirmed-(totalData.dates[keys[keys.length-1]].total.recovered
        +totalData.dates[keys[keys.length-1]].total.deceased+totalData.dates[keys[keys.length-1]].total.migrated)
        :
        totalData.dates[keys[keys.length-1]].total.confirmed-( totalData.dates[keys[keys.length-1]].total.recovered
            +totalData.dates[keys[keys.length-1]].total.deceased )
        }</h4>
    </div>
    <div id="p4"><h4>Total Deaths: {totalData.dates[keys[keys.length-1]].total.deceased}</h4>
    <h5 className='new'>
        {totalData.dates[keys[keys.length-1]].delta?
        totalData.dates[keys[keys.length-1]].delta.deceased?
        '+ '+ totalData.dates[keys[keys.length-1]].delta.deceased : 
        null : null}
    </h5>
    </div>
    <div id="p5">
    <h4>
        Total Tests: {totalData.dates[keys[keys.length-1]].total.tested}
    </h4>
    <h5 className='new'>
        {totalData.dates[keys[keys.length-1]].delta?
        totalData.dates[keys[keys.length-1]].delta.tested?
        '+ '+ totalData.dates[keys[keys.length-1]].delta.tested : 
        null : null}
    </h5>
    </div>
    </div> :
    <div>
        Loading...
    </div>
    )
}

export default Header