import React from 'react'
import UserSelection from './UserSelection'

const BetBuilders = ({ displayData }) => {

  console.log(displayData)

  return (
    <div>
      {
    
      <div className='Match-Data' >
        <h5 className='Match-Date' >
          {displayData.KickOffUtc}
        </h5>
        <h5 className='Match-Name'>
          {displayData.MatchName}
        </h5>
      </div>
      
      }
      <UserSelection displayData={displayData} />
    </div>
  )
}

export default BetBuilders