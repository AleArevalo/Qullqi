import { Movement } from "./movement"

export interface Budget {
    name: string
    month: number
    year: number
    incomes: Movement[]
    expenses: Movement[]
}