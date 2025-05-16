import { TDate } from "../../../shared/types/date"

export type TCircleHistoryProps = {
  data: TDate[]
  selectedCategoryId: number
  handleChangePeriod: (id: number) => void
}