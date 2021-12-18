import React, { ReactElement } from 'react'

interface Props {
  font: string
  color: string
  size: number
  weight: number
  padding: number
  children: ReactElement[] | ReactElement | string
}

const Typography = ({
  font,
  color,
  size,
  weight,
  padding,
  children,
  ...props
}: Props): JSX.Element => {
  return (
    <p
      style={{
        color: color,
        fontFamily: font,
        fontSize: `${size}px`,
        fontWeight: weight,
        padding: `${padding}px`,
      }}
      {...props}
    >
      {children}
    </p>
  )
}

export default Typography
