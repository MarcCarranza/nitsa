"use client";

import { ReactElement, useEffect, useState } from "react";
import { BgOptions, EventData } from "../../../types";
import styles from "./generator.module.css";

export type Props = {
  headerData: any;
  data: EventData[];
  type: number;
  // colors: Record<string, string>
  bgOptions: BgOptions;
};

enum GeneratorTypes {
  Rectangle = 0,
  Round = 1,
  Path = 2,
}

const ROW_LENGTH = 6;

export default function Generator({
  type,
  bgOptions,
  headerData,
  data,
}: Props): ReactElement {
  // Background
  const [bgGrid, setBgGrid] = useState<Array<Record<string, number>>>([]);

  // useEffect(() => {
  //   console.log(headerData);
  // }, [headerData]);

  useEffect(() => {
    calculateRectangles();
  }, [type, bgOptions]);

  // useEffect(() => {
  //   console.log(bgGrid)
  // }, [bgGrid])

  const calculateRectangles = (): void => {
    // if (Object.keys(bgOptions).length < 3) {
    //   alert('Falten opcions per seleccionar')
    //   return
    // }

    let updatedBgGrid = [...bgGrid];

    for (let i = 0; i < ROW_LENGTH; i++) {
      let rectangle = {
        width: 0,
        left: 0,
        top: 0,
      };
      // Vertical rectangles
      if (bgOptions.asc) {
        rectangle.width = 15 * (i + 1);
      } else {
        rectangle.width = 15 * (ROW_LENGTH - i);
      }

      if (!bgOptions.left) {
        rectangle.left = 100 - rectangle.width;
      }
      updatedBgGrid.push(...Array(ROW_LENGTH).fill(rectangle));
    }

    setBgGrid(updatedBgGrid);
  };

  const renderBackground = (): ReactElement[] => {
    return bgGrid.map((row) => {
      const cellContent = [];
      for (let i = 0; i < ROW_LENGTH; i++) {
        cellContent.push(
          <div
            className={styles.bgGridCellContent}
            style={{ width: `${row.width}%` }}
          />
        );
      }

      return <div className={styles.bgGridCell}>{cellContent}</div>;
    });
  };

  // Text
  // const getColsAndRows = (): { columns: number; rows: number } => {
  //   const columns = data.length < 4 ? 1 : 2
  //   let rows = data.length
  //   if (columns === 2) {
  //     rows = Math.ceil(data.length / 2)
  //   }

  //   return { columns, rows }
  // }
  const renderText = (): ReactElement[] => {
    if (!data.length) {
      return null;
    }

    return data.map((obj) => {
      console.log(obj);
      return (
        <div>
          <div>
            <h4>{obj.place}</h4>
            {/* <h2>{obj.}</h2> */}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.poster}>
      <div className={styles.bgGrid}>{renderBackground()}</div>
      <div className={styles.textWrapper}>
        <div className={styles.textHeader}>
          <div className={styles.textHeader__title}>
            {headerData.month && <h1>{headerData.month}</h1>}
          </div>
          <div className={styles.textHeader__logoWrapper}>
            {headerData.logo && (
              <img className={styles.textHeader__logo} src={headerData.logo} />
            )}
          </div>
        </div>
        <div className={styles.textGrid}>{renderText()}</div>
      </div>
    </div>
  );
}
