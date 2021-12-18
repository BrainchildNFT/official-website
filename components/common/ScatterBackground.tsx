import React, { ReactElement } from 'react'

import styles from './ScatterBackground.module.css'

interface Props {
  bgColor: string
  patternOpacity: number
  children: ReactElement[] | ReactElement
}

const ScatterBackground = ({
  bgColor,
  patternOpacity,
  children,
}: Props): JSX.Element => {
  return (
    <div
      className={styles['bg-scatter']}
      style={
        {
          backgroundColor: bgColor,
          '--pattern-opacity': patternOpacity,
        } as React.CSSProperties
      }
    >
      <div className={styles['scatter-content']}>{children}</div>
    </div>
  )
}

ScatterBackground.defaultProps = {
  bgColor: '#151617',
  patternOpacity: 0.1,
}

export default ScatterBackground
