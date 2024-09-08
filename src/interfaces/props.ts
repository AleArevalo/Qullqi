import { Movement } from "./movement";

export interface Props {
    values: Movement[]
}

export interface PropsHistory {
    yearSelected: number
    monthSelected: number
    handleChangeDate: (year: number, month: number) => void
}

export interface PropsSummary {
    name: string
    amount: number
    totalIncomes: number
    totalExpenses: number
}