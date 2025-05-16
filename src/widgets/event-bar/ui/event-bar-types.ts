import { TDate } from "../../../shared/types/date"

export type TEventBarProps = {
  selectedCategoryId: number
  isChanging: boolean
  data: TDate[]
  isMobile: boolean
  childern?: React.ReactNode
}