import React, { ReactElement } from 'react'

import styles from './WithUnderline.module.css'

interface Props {
  children: ReactElement[] | ReactElement
}

const WithUnderline = ({ children }: Props) => {
  return <div className={styles['underline']}>{children}</div>
}

export default WithUnderline
