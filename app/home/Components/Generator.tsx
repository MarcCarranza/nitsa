'use client'

import { ReactElement, useEffect, useState } from 'react'
import { BgOptions, EventData } from '../../../types'
import styles from './generator.module.css'

export type Props = {
  // data: EventData[]
  type: number
  // colors: Record<string, string>
  bgOptions: BgOptions
}

enum GeneratorTypes {
  Rectangle = 0,
  Round = 1,
  Path = 2,
}

const ROW_LENGTH = 6

export default function Generator({ type, bgOptions }: Props): ReactElement {
  // Background
  const [bgGrid, setBgGrid] = useState<Array<Record<string, number>>>([])

  useEffect(() => {
    calculateRectangles()
  }, [type, bgOptions])

  const calculateRectangles = (): void => {
    // if (Object.keys(bgOptions).length < 3) {
    //   alert('Falten opcions per seleccionar')
    //   return
    // }

    let updatedBgGrid = [...bgGrid]

    for (let i = 0; i < ROW_LENGTH; i++) {
      let rectangle = {
        width: 0,
        left: 0,
        top: 0,
      }
      // Vertical rectangles
      if (bgOptions.asc) {
        rectangle.width = 15 * (i + 1)
      } else {
        rectangle.width = 15 * (ROW_LENGTH - i)
      }

      if (!bgOptions.left) {
        rectangle.left = 100 - rectangle.width
      }
      updatedBgGrid.push(...Array(ROW_LENGTH).fill(rectangle))
    }

    setBgGrid(updatedBgGrid)
  }

  const renderBackground = () => {
    return bgGrid.map((row) => {
      const cellContent = []
      for (let i = 0; i < ROW_LENGTH; i++) {
        cellContent.push(
          <div
            className={styles.gridCellContent}
            style={{ width: `${row.width}%` }}
          />
        )
      }

      return <div className={styles.gridCell}>{cellContent}</div>
    })
  }

  // Text
  // const getColsAndRows = (): { columns: number; rows: number } => {
  //   const columns = data.length < 4 ? 1 : 2
  //   let rows = data.length
  //   if (columns === 2) {
  //     rows = Math.ceil(data.length / 2)
  //   }

  //   return { columns, rows }
  // }

  return (
    <div className={styles.poster}>
      {/* Grid background */}
      <div className={styles.bgGrid}>{renderBackground()}</div>
    </div>
  )
}
