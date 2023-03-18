"use client";

import { ChangeEvent, ReactElement, useState, KeyboardEvent } from "react";

// Types
import { EventData } from "../../../types";

// Styles
import styles from "./event-inputs.module.css";

type Props = {
  updateData: Function;
};

enum INPUTS {
  DATE = 0,
  PLACE = 1,
  NAME = 2,
  ARTISTS = 3,
}

export default function EventInputs({ updateData }: Props): ReactElement {
  const [eventData, setEventData] = useState<EventData>({
    day: "",
    place: "",
    name: "",
    artists: [],
  });

  const handleArtistsInput = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      const updatedArtists = [...eventData.artists, e.currentTarget.value];
      setEventData({ ...eventData, artists: updatedArtists });
    }
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
    type: number
  ): void => {
    if (!event || isNaN(type)) {
      console.error("Error onChangeInput");
    }

    const updatedData = { ...eventData };

    switch (type) {
      case INPUTS.DATE:
        updatedData.day = event.currentTarget.value;
        break;
      case INPUTS.PLACE:
        updatedData.place = event.currentTarget.value;
        break;
      case INPUTS.NAME:
        updatedData.name = event.currentTarget.value;
        break;
    }

    setEventData(updatedData);
  };

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
        <label>Lloc</label>
        <input type="text" onChange={(e) => onChangeInput(e, INPUTS.PLACE)} />
      </div>
      <div className={styles.inputWrapper}>
        <label>Artists</label>
        <input type="text" onKeyDown={handleArtistsInput} />
      </div>
      <div className={styles.addWrapper}>
        <button className={styles.addBtn} onClick={() => updateData(eventData)}>
          Afegir
        </button>
      </div>
    </div>
  );
}
