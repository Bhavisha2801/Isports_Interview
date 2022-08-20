import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const UserSelection = ({displayData}) => {

    const [selection, setSelection] = useState([])
    const [marketData, setMarketData] = useState([])
    const [marketOutcome, setMarketOutcome] = useState('')
    const [marketId, setMarketId] = useState(0)
    const [legs, setLegs] = useState(0)
    const [betBuilders, setBetBuilders] = useState({})

    console.log(displayData)



    useEffect(() => {
        axios.get('http://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1')
        .then(res => setSelection([...res.data]))

        axios.get('http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1')
        .then(res => setMarketData([...res.data]))
    },[])

    console.log(selection)
    console.log(marketData)

    const fetchMarketName = (i) => {
        setMarketOutcome(marketData[i].MarketName)
        setMarketId(marketData[i].MarketId)
    }

    const fetchLegs = (i) => {
        setLegs(selection[i].selectionId)
    }

    console.log(marketOutcome, legs)


    const fetchBetBuilderData = async () => {
        const resultData = await axios.get(`http://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets?sports=1&matchId=${displayData.MatchId}&marketId=${marketId}&legs=${legs}&language=en`)

        setBetBuilders({...resultData.data})
        
    }
    
    let data = marketOutcome.split(" ")
    let marketName = data[0]
    let Outcome = data[data.length-1]

    console.log(marketOutcome.split(" "))

    console.log(marketName)


    console.log(betBuilders)


  return (
    <div>
        <div className='Match-Outcome-Main' >
            <div className='Match-Outcome'>
                <h4>Selection: </h4>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {marketOutcome}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                        {
                            marketData.map((item, index) => (
                                <h5 className="dropdown-item" onClick={() => fetchMarketName(index)}>{item.MarketName}</h5>
                            ))
                        }

                    </div>
                </div>
            </div>

            <div className='Match-Outcome'>
                <h4>Legs: </h4>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {legs}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        
                    {
                            selection.map((item, index) => (
                                <h5 className="dropdown-item" onClick={() => fetchLegs(index)}>{item.selectionId}</h5>
                            ))
                        }


                    </div>
                </div>
            </div>

            <div className='Match-Outcome'>
                <button className='btn btn-success' onClick={fetchBetBuilderData} >Get Data</button>
            </div>
        </div>

        <div className='Total-Odds'>
            <h3>Bet Builder Odds:
            <span className='Odds'>{betBuilders.TotalOdds}</span></h3>
        </div>

        <table className='Output'>
            <thead>
                <tr>
                <th>Market</th>
                <th>OutCome</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{marketName}</td>
                    <td>{Outcome}</td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default UserSelection