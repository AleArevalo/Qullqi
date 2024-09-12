import { useState, useEffect } from 'react'

import { Movement } from '../interfaces/movement'
import { Budget } from '../interfaces/budget'
import Controller from '../components/Controller'
import History from '../components/History'
import Summary from '../components/Summary'
import Table from '../components/Table'

const Purse = () => {
    const [ yearSelected, setYearSelected ] = useState(new Date().getFullYear())
    const [ monthSelected, setMonthSelected ] = useState(new Date().getMonth())
    const [ budgetMovements, setBudgetMovements ] = useState<Budget[]>(() => {
        return JSON.parse(localStorage.getItem('budgetMovements') || '[]')
    })

    const handleChangeDate = (year: number, month: number) => {
        setYearSelected(year)
        setMonthSelected(month)
    }

    const getAvailableBalance = (): number => {
        const previousMonthIndex = budgetMovements.findIndex( (budget) => budget.month === (monthSelected - 1) && budget.year === yearSelected)

        if (previousMonthIndex === -1) {
            return 0
        }

        const incomes = budgetMovements[previousMonthIndex].incomes
        const expenses = budgetMovements[previousMonthIndex].expenses

        const incomesBalance = incomes.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0)
        const expensesBalance = expenses.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0)

        return incomesBalance - expensesBalance
    }

    const getIncomesAndExpenses = (): { incomes: Movement[], expenses: Movement[] } => {
        return {
            incomes: budgetMovements.find((budget) => budget.month === monthSelected && budget.year === yearSelected)?.incomes || [],
            expenses: budgetMovements.find((budget) => budget.month === monthSelected && budget.year === yearSelected)?.expenses || []
        }
    }

    const addBudgetMovement = (type: string) => {
        if (budgetMovements.length === 0) {
            const newBudgetMovement: Budget = {
                name: `${monthSelected} ${yearSelected}`,
                month: monthSelected,
                year: yearSelected,
                incomes: [],
                expenses: []
            }

            if (type === 'incomes') {
                newBudgetMovement.incomes.push({
                    name: '',
                    amount: '',
                    category: '',
                    dueDate: '',
                    type: '',
                    state: ''
                })
            } else {
                newBudgetMovement.expenses.push({
                    name: '',
                    amount: '',
                    category: '',
                    dueDate: '',
                    type: '',
                    state: ''
                })
            }

            setBudgetMovements([ ...budgetMovements, newBudgetMovement ])
        } else {
            const index = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

            if (index >= 0) {
                const newBudgetMovement = budgetMovements[index]

                if (type === 'incomes') {
                    newBudgetMovement.incomes.push({
                        name: '',
                        amount: '',
                        category: '',
                        dueDate: '',
                        type: '',
                        state: ''
                    })
                } else {
                    newBudgetMovement.expenses.push({
                        name: '',
                        amount: '',
                        category: '',
                        dueDate: '',
                        type: '',
                        state: ''
                    })
                }

                budgetMovements[index] = newBudgetMovement

                setBudgetMovements([ ...budgetMovements ])
            } else {
                const newBudgetMovement: Budget = {
                    name: `${monthSelected} ${yearSelected}`,
                    month: monthSelected,
                    year: yearSelected,
                    incomes: [],
                    expenses: []
                }

                if (type === 'incomes') {
                    newBudgetMovement.incomes.push({
                        name: '',
                        amount: '',
                        category: '',
                        dueDate: '',
                        type: '',
                        state: ''
                    })
                } else {
                    newBudgetMovement.expenses.push({
                        name: '',
                        amount: '',
                        category: '',
                        dueDate: '',
                        type: '',
                        state: ''
                    })
                }

                setBudgetMovements([ ...budgetMovements, newBudgetMovement ])
            }
        }
    }

    const updateBudgetMovement = (index: number, type: string, movement: Movement) => {
        if (budgetMovements.length === 0) {
            return
        }

        const indexUpdateBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (indexUpdateBudget >= 0) {
            budgetMovements[indexUpdateBudget][type as 'incomes' | 'expenses'][index] = movement

            setBudgetMovements([ ...budgetMovements ])
        }
    }

    const deleteBudgetMovement = (values: number[], type: string) => {
        if (budgetMovements.length === 0) {
            return
        }

        const indexUpdateBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (indexUpdateBudget >= 0) {
            const typeMovements = budgetMovements[indexUpdateBudget][type as 'incomes' | 'expenses']
            const newTypeMovements = typeMovements.filter((_, index) => !values.includes(index))

            budgetMovements[indexUpdateBudget][type as 'incomes' | 'expenses'] = newTypeMovements

            setBudgetMovements([ ...budgetMovements ])
        }
    }

    const getNameMonth = (): string => {
        return new Date(yearSelected, monthSelected).toLocaleString('default', { month: 'long' }).toUpperCase()
    }

    const handleRemoveAllBudget = () => {
        setBudgetMovements([])

        handleChangeDate(new Date().getFullYear(), new Date().getMonth())
    }

    const handleSetDefaultBudget = () => {
        const getCurrentBudgetMovement = budgetMovements.find((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (getCurrentBudgetMovement) {
            localStorage.setItem('currentBudget', JSON.stringify(getCurrentBudgetMovement))
        }
    }

    const handleRemoveCurrentBudget = () => {
        const indexUpdateBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (indexUpdateBudget >= 0) {
            budgetMovements[indexUpdateBudget].incomes = []
            budgetMovements[indexUpdateBudget].expenses = []

            setBudgetMovements([ ...budgetMovements ])
        }
    }

    useEffect(() => {
        if (budgetMovements) {
            localStorage.setItem('budgetMovements', JSON.stringify(budgetMovements))
        }
    }, [ budgetMovements ])

    return (
        <main className="w-10/12 mx-auto">
            <div className="flex gap-8">
                <History
                    yearSelected={ yearSelected }
                    monthSelected={ monthSelected }
                    handleChangeDate={ handleChangeDate }
                />
                <div className="w-full">
                    <Controller
                        changeDate={ handleChangeDate }
                        setDefaultBudget={ handleSetDefaultBudget }
                        removeCurrentBudget={ handleRemoveCurrentBudget }
                        removeAllBudget={ handleRemoveAllBudget }
                    />
                    <Summary
                        name={ getNameMonth() }
                        subName={ yearSelected }
                        amount={ getAvailableBalance() }
                        totalIncomes={ getIncomesAndExpenses().incomes.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                        totalExpenses={ getIncomesAndExpenses().expenses.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                    />
                    <hr className="border-slate-700" />
                    <Table
                        type="incomes"
                        values={ getIncomesAndExpenses().incomes }
                        addValues={ addBudgetMovement }
                        setValues={ updateBudgetMovement }
                        deleteValues={ deleteBudgetMovement }
                    />
                    <Table
                        type="expenses"
                        values={ getIncomesAndExpenses().expenses }
                        addValues={ addBudgetMovement }
                        setValues={ updateBudgetMovement }
                        deleteValues={ deleteBudgetMovement }
                    />
                </div>
            </div>
        </main>
    )
}

export default Purse