import React from 'react';
import fetchData, { confirmedDaily } from './Components/api'
import Header from './Components/header'
import StatePicker from './Components/chart'
import {Chart} from './Components/chart'

class App extends React.Component {
  state={ 
    data:{}, 
    totalData: {},
    keys: null,
    populations: {},
    State: "", 
    stateData:{}
  }
 

  async componentDidMount(){
    const fetcheddata = await fetchData()
    var stateData = await confirmedDaily()
    console.log(fetcheddata)
    console.log(stateData)

    const populations = {}
    populations["Total"]=1352642280
    populations["Maharashtra"]=112374333
    populations["Tamil Nadu"]=72147030
    populations["Delhi"]=16787941
    populations["Karnataka"]=61130704
    populations["Andhra Pradesh"]=49386799
    populations["Uttar Pradesh"]=199812341
    populations["Gujarat"]=60439692
    populations["West Bengal"]=91347736
    populations["Telangana"]=35193978
    populations["Rajasthan"]=68548437
    populations["Bihar"]=104099452
    populations["Odisha"]=41974218
    populations["Jammu and Kashmir"]=9944283
    populations["Kerala"]=33387677
    populations["Punjab"]=	27743338
    populations["Jharkand"]=32988134
    populations["Uttarakhand"]=10086292
    populations["Goa"]=145854
    populations["Tripura"]=3671032
    populations["Puducherry"]=1394467
    populations["Chhattisgarh"]=32186262
    populations["Assam"]=31169272
    populations["Haryana"]=25353081
    populations["Madhya Pradesh"]=72626809
      this.setState({
        mainStateData : stateData,
        data:fetcheddata,
        totalData: fetcheddata,
        populations: populations, 
        stateData:stateData
      })
      
  }
  handleStateChange = async  (changedState) =>{
    const dict={}
    dict["Maharashtra"] = "MH"
    dict["Tamil Nadu"]="TN"
    dict["Delhi"]="DL"
    dict["Karnataka"]="KA"
    dict["Andhra Pradesh"]="AP"
    dict["Uttar Pradesh"]="UP"
    dict["Gujarat"]="GJ"
    dict["West Bengal"]="WB"
    dict["Telangana"]="TG"
    dict["Rajasthan"]="RJ"
    dict["Bihar"]="BR"
    dict["Haryana"]="HR"
    dict["Assam"]="AS"
    dict["Madhya Pradesh"]="MP"
    dict["Odisha"]="OR"
    dict["Jammu and Kashmir"]="JK"
    dict["Kerala"]="KL"
    dict["Punjab"]="PB"
    dict["Jharkand"]="JH"
    dict["Uttarakhand"]="UT"
    dict["Goa"]="GA"
    dict["Tripura"]="TR"
    dict["Puducherry"]="PY"
    dict["Chhattisgarh"]="CT"
    if(changedState==="Total"){
      this.setState({
        data: await fetchData(),
        keys: null
      })
    }
    else{
      var s=dict[changedState]
      var data= await confirmedDaily()
      data=data[s]
      var keys = Object.keys(data.dates)
      this.setState({
        data: data,
       keys: keys,
       State: changedState
      })
    }
    
     return(changedState)   
 }
  render (){
    return(
    <div>
      
      <Header totalData={this.state.data} keys={this.state.keys}/>
       <div id="title">
       <h2> <b>COVID 19 TRACKER</b> </h2>
      </div>
      <StatePicker totalData={this.state.totalData} handleStateChange={this.handleStateChange} />
      <Chart totalData={this.state.data} keys={this.state.keys} populations={this.state.populations} State={this.state.State} stateData={this.state.stateData}/>
    </div>
    )
  }
}

export default App;
