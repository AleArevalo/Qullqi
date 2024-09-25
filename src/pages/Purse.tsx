import { useState, useEffect } from 'react'

import { Movement } from '../interfaces/movement'
import { Budget } from '../interfaces/budget'
import Controller from '../components/Controller'
import History from '../components/History'
import Summary from '../components/Summary'
import { Movements } from '../components/Movements'
import { ToastSwal } from '../utils/swal-custom'
import { useAuth } from '../hooks/useAuth'
import {
    createBudget,
    createMovement,
    getAllBudgets,
    removeMovement,
    setDefaultBudget,
    setMovementsArrayInBudget,
    updateMovement
} from '../services/budget'

const actualDate = new Date()

const Purse = () => {
    const { idUser } = useAuth()

    const [ budgeSelected, setBudgeSelected ] = useState<Budget>({
        id: '',
        month: actualDate.getMonth(),
        year: actualDate.getFullYear(),
        isDefault: false,
        incomes: [],
        expenses: []
    })
    const [ yearSelected, setYearSelected ] = useState(actualDate.getFullYear())
    const [ monthSelected, setMonthSelected ] = useState(actualDate.getMonth())
    const [ budgetMovements, setBudgetMovements ] = useState<Budget[]>(() => {
        return JSON.parse(localStorage.getItem('budgetMovements') || '[]')
    })
    const [ isTableViewIncomes, setTableViewIncomes ] = useState(true)
    const [ isTableViewExpenses, setTableViewExpenses ] = useState(true)

    const handleChangeDate = (year: number, month: number) => {
        setYearSelected(year)
        setMonthSelected(month)

        setTableViewIncomes(true)
        setTableViewExpenses(true)

        setIncomesAndExpenses(year, month)
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

    const setIncomesAndExpenses = (year: number, month: number) => {
        const budgetSelectedIndex = budgetMovements.findIndex((budget) => budget.month === month && budget.year === year)

        if (budgetSelectedIndex >= 0) {
            setBudgeSelected(budgetMovements[budgetSelectedIndex])
        } else {
            setBudgeSelected({
                id: '',
                month: monthSelected,
                year: yearSelected,
                isDefault: false,
                incomes: [],
                expenses: []
            })
        }
    }

    const addBudgetMovement = async (type: string) => {
        if (budgetMovements.length === 0) {
            const newBudgetMovement: Budget = {
                id: await getNewIDBudget(),
                month: monthSelected,
                year: yearSelected,
                isDefault: false,
                incomes: [],
                expenses: []
            }
            const newMovement = {
                id: '',
                name: '',
                amount: '',
                category: '',
                dueDate: '',
                type: '',
                state: ''
            }
            newMovement.id = await setNewMovement(newBudgetMovement.id, type, newMovement)

            if (type === 'incomes') {
                newBudgetMovement.incomes.push(newMovement)
            } else {
                newBudgetMovement.expenses.push(newMovement)
            }

            setBudgetMovements([ ...budgetMovements, newBudgetMovement ])
        } else {
            const index = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

            if (index >= 0) {
                const newBudgetMovement = budgetMovements[index]
                const newMovement = {
                    id: '',
                    name: '',
                    amount: '',
                    category: '',
                    dueDate: '',
                    type: '',
                    state: ''
                }
                newMovement.id = await setNewMovement(newBudgetMovement.id, type, newMovement)

                if (type === 'incomes') {
                    newBudgetMovement.incomes.push(newMovement)
                } else {
                    newBudgetMovement.expenses.push(newMovement)
                }

                budgetMovements[index] = newBudgetMovement

                setBudgetMovements([ ...budgetMovements ])
            } else {
                const newBudgetMovement: Budget = {
                    id: await getNewIDBudget(),
                    month: monthSelected,
                    year: yearSelected,
                    isDefault: false,
                    incomes: [],
                    expenses: []
                }
                const newMovement = {
                    id: '',
                    name: '',
                    amount: '',
                    category: '',
                    dueDate: '',
                    type: '',
                    state: ''
                }
                newMovement.id = await setNewMovement(newBudgetMovement.id, type, newMovement)

                if (type === 'incomes') {
                    newBudgetMovement.incomes.push(newMovement)
                } else {
                    newBudgetMovement.expenses.push(newMovement)
                }

                setBudgetMovements([ ...budgetMovements, newBudgetMovement ])
            }
        }
    }

    const getNewIDBudget = async (): Promise<string> => {
        if (idUser) {
            const { success, message, data } = await createBudget(idUser, monthSelected, yearSelected)

            if (!success) {
                ToastSwal('error', message)
            }

            if (data) {
                return data[0].id ?? ''
            }
        }

        return ''
    }

    const setNewMovement = async (idBudget: string, type: string, movement: Movement): Promise<string> => {
        if (idUser) {
            const { success, message, data } = await createMovement(idBudget, type, movement)

            if (!success) {
                ToastSwal('error', message)
            }

            if (data) {
                return data[0].id ?? ''
            }
        }

        return ''
    }

    const updateBudgetMovement = async (index: number, type: string, movement: Movement) => {
        if (budgetMovements.length === 0) {
            return
        }

        const indexUpdateBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (indexUpdateBudget >= 0) {
            budgetMovements[indexUpdateBudget][type as 'incomes' | 'expenses'][index] = movement

            setBudgetMovements([ ...budgetMovements ])

            if (idUser) {
                const { success, message } = await updateMovement(movement.id ?? '', movement)
    
                if (!success) {
                    ToastSwal('error', message)
                }
            }
        }
    }

    const deleteBudgetMovement = async (values: string[], type: string) => {
        if (budgetMovements.length === 0) {
            return
        }

        const indexUpdateBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (indexUpdateBudget >= 0) {
            const typeMovements = budgetMovements[indexUpdateBudget][type as 'incomes' | 'expenses']
            const newTypeMovements = typeMovements.filter((item) => !values.includes(item.id))

            budgetMovements[indexUpdateBudget][type as 'incomes' | 'expenses'] = newTypeMovements

            setBudgetMovements([ ...budgetMovements ])

            if (idUser) {
                const { success, message } = await removeMovement(values)
    
                if (!success) {
                    ToastSwal('error', message)
                }
            }
        }
    }

    const handleRemoveAllBudget = () => {
        setBudgetMovements([])

        handleChangeDate(actualDate.getFullYear(), actualDate.getMonth())

        ToastSwal('success', 'Todas las hojas eliminadas')
    }

    const handleSetDefaultBudget = async () => {
        const indexBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (indexBudget) {
            budgetMovements.forEach((budget, index) => {
                if (index === indexBudget) {
                    budget.isDefault = true
                } else {
                    budget.isDefault = false
                }
            })

            setBudgetMovements([ ...budgetMovements ])

            if (idUser) {
                const { success, message } = await setDefaultBudget(budgetMovements[indexBudget].id)

                if (!success) {
                    ToastSwal('error', message)
                }
            }

            ToastSwal('success', 'Hoja predeterminada establecida')
        }
    }

    const handleRemoveCurrentBudget = () => {
        const indexUpdateBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

        if (indexUpdateBudget >= 0) {
            budgetMovements[indexUpdateBudget].incomes = []
            budgetMovements[indexUpdateBudget].expenses = []

            setBudgetMovements([ ...budgetMovements ])

            ToastSwal('success', 'Hoja actual eliminada')
        }
    }

    const loadAllBudgets = async (userId: string) => {
        if (userId) {
            const { success, message, data } = await getAllBudgets(userId)

            if (!success) {
                ToastSwal('error', message)
            }

            if (data) {
                setBudgetMovements(data)

                const indexBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

                if (indexBudget >= 0) {
                    setBudgeSelected(budgetMovements[indexBudget])
                }

                ToastSwal('success', 'Sincronización exitosa')
            }
        }
    }

    const handleEstablishDefaultBudget = async () => {
        const defaultBudget = budgetMovements.find((budget) => budget.isDefault)

        if (defaultBudget) {
            const indexBudget = budgetMovements.findIndex((budget) => budget.month === monthSelected && budget.year === yearSelected)

            if (indexBudget >= 0) {
                if (idUser) {
                    const { success, message, data } = await setMovementsArrayInBudget(budgetMovements[indexBudget].id, defaultBudget.incomes, defaultBudget.expenses)

                    if (success) {
                        budgetMovements[indexBudget].incomes = data.incomes
                        budgetMovements[indexBudget].expenses = data.expenses

                        setBudgetMovements([ ...budgetMovements ])
                        setBudgeSelected(budgetMovements[indexBudget])

                        ToastSwal('success', 'Presupuesto establecido como predeterminado')
                    } else {
                        ToastSwal('error', message)
                    }
                } else {
                    budgetMovements[indexBudget].incomes = defaultBudget.incomes
                    budgetMovements[indexBudget].expenses = defaultBudget.expenses

                    setBudgetMovements([ ...budgetMovements ])
                    setBudgeSelected(budgetMovements[indexBudget])

                    ToastSwal('success', 'Presupuesto establecido como predeterminado')
                }
            } else {
                const newBudgetMovement: Budget = {
                    id: await getNewIDBudget(),
                    month: monthSelected,
                    year: yearSelected,
                    isDefault: false,
                    incomes: defaultBudget.incomes,
                    expenses: defaultBudget.expenses
                }

                if (idUser) {
                    const { success, message, data } = await setMovementsArrayInBudget(newBudgetMovement.id, newBudgetMovement.incomes, newBudgetMovement.expenses)

                    if (success) {
                        newBudgetMovement.incomes = data.incomes
                        newBudgetMovement.expenses = data.expenses

                        setBudgetMovements([ ...budgetMovements, newBudgetMovement ])
                        setBudgeSelected(newBudgetMovement)

                        ToastSwal('success', 'Presupuesto establecido como predeterminado')
                    } else {
                        ToastSwal('error', message)
                    }
                } else {
                    setBudgetMovements([ ...budgetMovements, newBudgetMovement ])
                    setBudgeSelected(newBudgetMovement)
                }
            }
        } else {
            ToastSwal('error', 'No se encontró ningún presupuesto predeterminado')
        }
    }

    useEffect(() => {
        if (budgetMovements) {
            localStorage.setItem('budgetMovements', JSON.stringify(budgetMovements))
        }
    }, [ budgetMovements ])

    useEffect(() => {
        if (idUser) {
            loadAllBudgets(idUser)
        }
    }, [ idUser ])

    return (
        <main className="w-10/12 mx-auto mb-20">
            <div className="sm:flex sm:gap-8">
                <div className="w-full">
                    <Controller
                        isEqualDates={ (actualDate.getFullYear() === yearSelected && actualDate.getMonth() === monthSelected) }
                        isDefaultBudget={ budgeSelected.isDefault }
                        changeDate={ handleChangeDate }
                        setDefaultBudget={ handleSetDefaultBudget }
                        establishDefaultBudget={ handleEstablishDefaultBudget }
                        removeCurrentBudget={ handleRemoveCurrentBudget }
                        removeAllBudget={ handleRemoveAllBudget }
                    />
                    <Summary
                        name={ new Date(yearSelected, monthSelected).toLocaleString('default', { month: 'long' }).toUpperCase() }
                        subName={ yearSelected }
                        amount={ getAvailableBalance() }
                        totalIncomes={ budgeSelected.incomes.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                        totalExpenses={ budgeSelected.expenses.reduce((total, item) => total + Number(item.amount?.replace(/\$|\./g, '')), 0) }
                    />
                    <hr className="border-slate-400 dark:border-slate-700" />
                    <Movements
                        type="incomes"
                        values={ budgeSelected.incomes }
                        addValues={ addBudgetMovement }
                        setValues={ updateBudgetMovement }
                        deleteValues={ deleteBudgetMovement }
                        isTable={ isTableViewIncomes }
                        setChangeTable={ setTableViewIncomes }
                    />
                    <Movements
                        type="expenses"
                        values={ budgeSelected.expenses }
                        addValues={ addBudgetMovement }
                        setValues={ updateBudgetMovement }
                        deleteValues={ deleteBudgetMovement }
                        isTable={ isTableViewExpenses }
                        setChangeTable={ setTableViewExpenses }
                    />
                </div>
                <History
                    yearSelected={ yearSelected }
                    monthSelected={ monthSelected }
                    handleChangeDate={ handleChangeDate }
                />
            </div>
        </main>
    )
}

export default Purse