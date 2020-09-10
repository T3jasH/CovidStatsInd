import axios from 'axios'

var url = 'https://api.covid19india.org/data.json'

const fetchData = async () =>{
    try {
        const {data:{cases_time_series, statewise, tested } } = await axios.get(url)
        const states = statewise.map(p=>{return p.state})
        const modifieddata= {cases_time_series, statewise, tested, states }
        return modifieddata
    } catch (error) {
        
    }
}
var url2 ='https://api.covid19india.org/v4/timeseries.json'
export const confirmedDaily =async ()=>{
    try{
        const {data} = await axios.get(url2)
        return data
    }
    catch(error){
        console.log(error)
    }
}


export default fetchData