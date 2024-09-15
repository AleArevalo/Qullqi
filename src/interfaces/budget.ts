import { Movement } from "./movement"

export interface Budget {
    month: number
    year: number
    incomes: Movement[]
    expenses: Movement[]
}