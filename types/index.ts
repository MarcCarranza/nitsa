export type EventData = {
  day: string
  times: {
    start: string | null
    end: string | null
  }
  place: string
  name: string
}

export type BgOptions = Record<string, boolean>