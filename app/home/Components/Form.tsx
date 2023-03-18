'use client'

import { ChangeEvent, ReactElement, useState } from 'react'

// Components
import EventInputs from './EventInputs'

// Types
import { EventData, Option } from '../../../types'

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

const BG_TYPES: Option[] = [
  { label: "Rectangular", value: 0 },
  { label: "Round", value: 1 },
  { label: "Path", value: 2 }
]

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
  const onChangeMonth = (e: ChangeEvent<HTMLInputElement>): void => {
    updateMonth(e.currentTarget.value)
  }

  const onUploadLogo = (e: ChangeEvent<HTMLInputElement>): void => {
    updateLogo(URL.createObjectURL(e.currentTarget.files[0]))
  }

  const onAddEvent = (event): void => {
    updateData(event)
    setOpen(false)
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
        <div className={'test'}>
          <label>Fons</label>
          <select onChange={(e) => console.log(e.currentTarget.value)}>
            {BG_TYPES.map((option: Option) => {
              return <option value={option.value}>{option.value}</option>
            })}
          </select>
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
      {isOpen && <EventInputs updateData={onAddEvent} />}
    </div>
  )
}
