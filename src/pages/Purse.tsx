import { useState, useEffect } from 'react'

import { Movement } from '../interfaces/movement'
import { Budget } from '../interfaces/budget'
import History from '../components/History'
import Summary from '../components/Summary'
import Expenses from '../components/Expenses'
import Incomes from '../components/Incomes'

const Purse = () => {
    const [ amount ] = useState<number>(10)
    const [ yearSelected, setYearSelected ] = useState(new Date().getFullYear())
    const [ monthSelected, setMonthSelected ] = useState(new Date().getMonth())
    const [ budgetMovements ] = useState<Budget[]>(() => {
        return JSON.parse(localStorage.getItem('budgetMovements') || '[]')
    })

    const handleChangeDate = (year: number, month: number) => {
        setYearSelected(year)
        setMonthSelected(month)
    }

    const getIncomesAndExpenses = (): { incomes: Movement[], expenses: Movement[] } => {
        return {
            incomes: [],
            expenses: []
        }
    }

    useEffect(() => {
        if (budgetMovements) {
            localStorage.setItem('budgetMovements', JSON.stringify(budgetMovements))
        }
    }, [ budgetMovements ])

    return (
        <main className="w-10/12 mx-auto my-8">
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
                Qullqi
            </h1>
            <div className="flex gap-8">
                <History yearSelected={ yearSelected } monthSelected={ monthSelected } handleChangeDate={ handleChangeDate } />
                <div className="w-full">
                    <Summary
                        name="Septiembre"
                        amount={ amount }
                        totalIncomes={ getIncomesAndExpenses().incomes.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                        totalExpenses={ getIncomesAndExpenses().expenses.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                    />
                    <hr className="border-slate-700" />
                    <Incomes values={ getIncomesAndExpenses().incomes } />
                    <Expenses values={ getIncomesAndExpenses().expenses } />
                </div>
            </div>
        </main>
    )
}

export default Purse