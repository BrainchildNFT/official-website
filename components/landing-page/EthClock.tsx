import React from 'react'
import Padding from '../common/Padding'

import ScatterBackground from '../common/ScatterBackground'
import Typography from '../common/Typography'
import WithUnderline from '../common/WithUnderline'

const EthClock = () => {
  return (
    <ScatterBackground>
      <Padding size={60}>
        <div className="w-96">
          <WithUnderline>
            <Typography
              size={20}
              color="white"
              padding={20}
              font="Inter"
              weight={500}
            >
              5000 Mints
            </Typography>
          </WithUnderline>
          <WithUnderline>
            <Typography
              size={20}
              color="white"
              padding={20}
              font="Inter"
              weight={500}
            >
              Level 1-10 Enhancements available
            </Typography>
          </WithUnderline>
          <WithUnderline>
            <Typography
              size={20}
              color="white"
              padding={20}
              font="Inter"
              weight={500}
            >
              Perpetually Redeemable
            </Typography>
          </WithUnderline>
        </div>
      </Padding>
    </ScatterBackground>
  )
}

export default EthClock
