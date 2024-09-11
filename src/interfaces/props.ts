import { Movement } from "./movement";

export interface Props {
    type: string
    values: Movement[]
    addValues: (type: string) => void
    setValues: (index: number, type: string, movement: Movement) => void
    deleteValues: (values: number[], type: string) => void
}

export interface PropsHistory {
    yearSelected: number
    monthSelected: number
    handleChangeDate: (year: number, month: number) => void
}

export interface PropsSummary {
    name: string
    subName: string | number
    amount: number
    totalIncomes: number
    totalExpenses: number
}