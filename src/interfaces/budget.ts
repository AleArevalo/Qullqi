import { Movement } from "./movement"

export interface Budget {
    id: string
    month: number
    year: number
    incomes: Movement[]
    expenses: Movement[]
}