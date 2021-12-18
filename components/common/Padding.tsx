import React, { ReactElement } from 'react'

interface Props {
  size: number
  children: ReactElement[] | ReactElement | string
}

const Padding = ({ size, children }: Props) => {
  return <div style={{ padding: `${size}px` }}>{children}</div>
}

export default Padding
