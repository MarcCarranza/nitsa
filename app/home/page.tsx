"use client";

import { ReactElement, useEffect, useState } from "react";
import { BgOptions, EventData } from "../../types";

// Components
import Form from "./Components/Form";
import Generator from "./Components/Generator";

// Styles
import styles from "./home.module.css";

const MONTHS = [
  "Gener",
  "Febrer",
  "Marzo",
  "Abril",
  "Maig",
  "Juny",
  "Juliol",
  "Agost",
  "Septembre",
  "Octubre",
  "Novembre",
  "Desembre",
];

export default function Home(): ReactElement {
  // States
  const [month, setMonth] = useState<string>("");
  const [logo, setLogo] = useState<File>(null);
  const [data, setData] = useState<EventData[]>([]);
  const [bgType, setBgType] = useState<number>(0);
  const [bgOptions, setBgOptions] = useState<BgOptions>({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Functions
  const updateData = (newData: EventData) => {
    const updatedData = [...data, newData];
    setData(updatedData);
  };

  return (
    <div className={styles.home}>
      <Form
        month={month}
        logo={logo}
        data={data}
        updateMonth={setMonth}
        updateLogo={setLogo}
        updateData={updateData}
      />
      <Generator
        type={bgType}
        bgOptions={bgOptions}
        headerData={{ month, logo }}
        data={data}
      />
    </div>
  );
}
