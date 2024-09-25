import { Movement } from "./movement";

export interface Props {
    type: string
    values: Movement[]
    addValues: (type: string) => void
    setValues: (index: number, type: string, movement: Movement) => void
    deleteValues: (values: string[], type: string) => void
    isTable: boolean
    setChangeTable: (isTable: boolean) => void
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

export interface PropsController {
    isEqualDates:boolean
    changeDate: (year: number, month: number) => void
    setDefaultBudget: () => void
    removeCurrentBudget: () => void
    removeAllBudget: () => void
}

export interface PropsPieChart {
    type: string
    values: Movement[]
    isChart: boolean
    setChangeChart: (isChart: boolean) => void
}