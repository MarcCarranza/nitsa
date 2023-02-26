'use client'

import { ReactElement, useState } from 'react'

// Components
import EventInputs from './EventInputs'

// Types
import { EventData } from '../../../types'

// Styles
import styles from './form.module.css'

type Props = {
  month: string
  logo: any
  data: EventData[]
  updateMonth: Function
  updateLogo: Function
  updateData: Function
}

export default function Form({
  month,
  logo,
  data,
  updateMonth,
  updateLogo,
  updateData,
}: Props): ReactElement {
  // State
  const [isOpen, setOpen] = useState(false)

  // Handlers
  const onChangeMonth = (month): void => {
    console.log(month)
    // updateMonth()
  }

  const onUploadLogo = (logo): void => {
    console.log(logo)
    // updateLogo()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.inputWrapper}>
          <label>Mes</label>
          <input type="text" onChange={onChangeMonth} placeholder="Mes" />
        </div>
        <div className={styles.inputWrapper}>
          <label>Logo</label>
          <input type="file" onChange={onUploadLogo} />
        </div>
      </div>
      <div className={styles.addWrapper}>
        <button
          className={styles.addBtn}
          onClick={() => setOpen(true)}
          disabled={!!isOpen}
        >
          Afegir
        </button>
      </div>
      {isOpen && <EventInputs updateData={(updatedData) => updateData(updatedData)} />}
    </div>
  )
}
