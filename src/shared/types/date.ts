export type TDate = {
  id: number,
  category: string,
  startYear: number,
  endYear: number,
  events: {
    id: number,
    year: number,
    description: string,
  }[]
}
