import { Movement } from "./movement"

export interface Budget {
    id: string
    month: number
    year: number
    isDefault: boolean
    incomes: Movement[]
    expenses: Movement[]
}