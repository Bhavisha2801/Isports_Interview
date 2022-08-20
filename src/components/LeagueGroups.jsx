import React from 'react'
import { Link } from 'react-router-dom'

const LeagueGroups = ({ fixture, setFixture, resultData, setResultData, Dates, fetchMatchDetails }) => {



    const checkDate = (i) => {
      const result = fixture.filter(date => date.MatchDate.split(" ")[0] === Dates[i])
      setResultData([...result])
    }

    console.log(resultData)

    const convertUTC = (date) => {
      const res = new Date(date).toLocaleString()
      return res
    }



  return (
    <div>
    <div className='Dates'>
      {
      Dates.map((date,index) => (
        <div className='date-main' onClick={() => checkDate(index)} key={index} >
        <h6 className='date-text'>{date}</h6>
      </div>
      ))
      }
    </div>

      <div className='League' >
      {

        resultData.length === 0 ? <h5>Click any Date to Fetch Data</h5>
        :
        resultData.map((item, index) => (
          <div className='LeagueData-Main' >
            <h5  className='LeagueData-Country'>{item.Country}</h5>
            <h6 className='LeagueData-LeagueName'>{item.LeagueName}</h6>
            <hr />
            <Link to='/betBuilders' >
              <h6 className='LeagueData-MatchName' onClick={() => fetchMatchDetails(index)} >{item.MatchName}</h6>
            </Link>
            <hr />
            <h6 className='LeagueData-MatchDate'>{convertUTC(item.MatchDate)}</h6>
          </div>
        ))
      }
      </div>


    </div>

  )
}

export default LeagueGroups