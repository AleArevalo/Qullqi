import { useState } from 'react'

import { Movement } from '../interfaces/movement'
import Summary from '../components/Summary'
import Expenses from '../components/Expenses'
import Income from '../components/Income'

const Purse = () => {
    const [ expenses, setExpenses ] = useState<Movement[]>([])
    const [ incomes, setIncome ] = useState<Movement[]>([])

    return (
        <main className="w-3/4 mx-auto">
            <Summary />
            <Income values={ incomes } />
            <Expenses values={ expenses } />
        </main>
    )
}

export default Purse