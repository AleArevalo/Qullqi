import { useState, useEffect } from 'react'

import { Movement } from '../interfaces/movement'
import History from '../components/History'
import Summary from '../components/Summary'
import Expenses from '../components/Expenses'
import Income from '../components/Income'

const Purse = () => {
    const [ amount ] = useState<number>(10)
    const [ expenses, setExpenses ] = useState<Movement[]>(() => {
        return JSON.parse(localStorage.getItem('expenses') || '[]')
    })
    const [ income, setIncome ] = useState<Movement[]>(() => {
        return JSON.parse(localStorage.getItem('income') || '[]')
    })

    useEffect(() => {
        if (expenses) {
            localStorage.setItem('expenses', JSON.stringify(expenses))
        }

        if (income) {
            localStorage.setItem('income', JSON.stringify(income))
        }
    }, [expenses, income])

    return (
        <main className="w-10/12 mx-auto my-8">
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
                Qullqi
            </h1>
            <div className="flex gap-8">
                <History />
                <div className="w-full">
                    <Summary
                        name="Septiembre"
                        amount={ amount }
                        totalIncome={ income.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                        totalExpenses={ expenses.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                    />
                    <hr className="border-slate-700" />
                    <Income values={ income } setValues={ setIncome } />
                    <Expenses values={ expenses } setValues={ setExpenses } />
                </div>
            </div>
        </main>
    )
}

export default Purse