import { useState, useEffect } from 'react'

import { Movement } from '../interfaces/movement'
import Summary from '../components/Summary'
import Expenses from '../components/Expenses'
import Income from '../components/Income'

const Purse = () => {
    const [ expenses, setExpenses ] = useState<Movement[]>([])
    const [ incomes, setIncome ] = useState<Movement[]>([])

    useEffect(() => {
        const dataExpenses = localStorage.getItem('expenses')
        const dataIncome = localStorage.getItem('income')

        if (dataExpenses) {
            setExpenses(JSON.parse(dataExpenses))
        }

        if (dataIncome) {
            setIncome(JSON.parse(dataIncome))
        }
    }, [])

    return (
        <main className="w-3/4 mx-auto my-8">
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
                Qullqi
            </h1>
            <Summary />
            <Income values={ incomes } setValues={ setIncome } />
            <Expenses values={ expenses } setValues={ setExpenses } />
        </main>
    )
}

export default Purse