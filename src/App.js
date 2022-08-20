import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import BetBuilders from './components/BetBuilders';
import LeagueGroups from './components/LeagueGroups';
import axios from 'axios';

function App() {

  const [fixture, setFixture] = useState([])
  const [resultData, setResultData] = useState([]) 
  const [displayData, setDisplayData] = useState({})

  const count = 1

    useEffect(() => {
        axios.get('http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1')
        .then(res => setFixture([...res.data]))
    },[count])

    console.log(fixture)

    const date = new Date()

    const Dates = []
    const IncDate = []

    const localDate = date.toLocaleDateString()
    let todayDate = date.getDate()


    for(let i=0 ; i<7 ; i++){
      
      Dates.push(localDate)
      IncDate.push(todayDate++)

    }

    const finalDates = []

    for(let i=0 ; i<7 ; i++){

      Dates[i].split("/")[1].replace(IncDate[i])

      finalDates.push(`${Dates[i].split("/")[0]}/${IncDate[i]}/${Dates[i].split("/")[2]}`)

    }


    const fetchMatchDetails = (i) => {
      setDisplayData({...resultData[i]})
    }




  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LeagueGroups fixture={fixture} setFixture={setFixture} resultData={resultData} setResultData={setResultData} Dates={finalDates} fetchMatchDetails={fetchMatchDetails} />} />
        <Route path='/betBuilders' element={<BetBuilders displayData={displayData}  />} />
      </Routes>
    </div>
  );
}

export default App;
