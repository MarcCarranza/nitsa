'use client'

import { BaseSyntheticEvent, ReactElement, useState } from 'react'

// Types
import { EventData } from '../../../types'

// Styles
import styles from './event-inputs.module.css'

type Props = {
  updateData: Function
}

enum INPUTS {
  DATE = 0,
  TIME_START = 1,
  TIME_END = 2,
  PLACE = 3,
  NAME = 4,
}

export default function EventInputs({ updateData }: Props): ReactElement {
  const [eventData, setEventData] = useState<EventData | {}>({})

  const onChangeInput = (event: BaseSyntheticEvent, type: number): void => {
    if (!event || isNaN(type)) {
      console.error('Error onChangeInput')
    }

    const updatedData = { ...eventData }
    if (!updatedData.times) {
      updatedData.times = {
        start: null,
        end: null,
      }
    }

    switch (type) {
      case INPUTS.DATE:
        updatedData.day = event.currentTarget.value
        break
      case INPUTS.TIME_START:
        updatedData.times.start = event.currentTarget.value
        break
      case INPUTS.TIME_END:
        updatedData.times.end = event.currentTarget.value
        break
      case INPUTS.PLACE:
        updatedData.place = event.currentTarget.value
        break
      case INPUTS.NAME:
        updatedData.name = event.currentTarget.value
        break
    }

    setEventData(updatedData)
  }

  return (
    <div className={styles.eventForm}>
      <div className={styles.inputWrapper}>
        <label>Nom</label>
        <input type="text" onChange={(e) => onChangeInput(e, INPUTS.NAME)} />
      </div>
      <div className={styles.inputWrapper}>
        <label>Dia</label>
        <input type="date" onChange={(e) => onChangeInput(e, INPUTS.DATE)} />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.timeWrapper}>
          <label>Inici</label>
          <input
            type="time"
            onChange={(e) => onChangeInput(e, INPUTS.TIME_START)}
          />
        </div>
        <div className={styles.timeWrapper}>
          <label>Cierre</label>
          <input
            type="time"
            onChange={(e) => onChangeInput(e, INPUTS.TIME_END)}
          />
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <label>Lloc</label>
        <input type="text" onChange={(e) => onChangeInput(e, INPUTS.PLACE)} />
      </div>
      <div className={styles.addWrapper}>
        <button className={styles.addBtn} onClick={() => updateData(eventData)}>
          Afegir
        </button>
      </div>
    </div>
  )
}
