import { Movement } from "../interfaces/movement"
import { supabase } from "../libs/supabase"

interface Response {
    success: boolean
    message: string
    data: any[] | null
}

export const createBudget = async (idUser: string, month: number, year: number): Promise<Response> => {
    const { data, error } = await supabase
        .from('Budget')
        .insert([
            { id_user: idUser, month, year },
        ])
        .select()

    return {
        success: !error,
        message: error ? 'Ocurrió un error al registrar el movimiento' : 'Movimiento registrado correctamente',
        data
    }
}

export const createMovement = async (idBudget: string, type: string, movement: Movement): Promise<Response> => {
    const { data, error } = await supabase
        .from('Movement')
        .insert([
            {
                id_budget: idBudget,
                type_budget: (type === 'incomes' ? 1 : 2),
                name: movement.name,
                amount: movement.amount,
                category: movement.category,
                dueDate: movement.dueDate,
                type: movement.type,
                state: movement.state
            }
        ])
        .select()

    return {
        success: !error,
        message: error ? 'Ocurrió un error al registrar el movimiento' : 'Movimiento registrado correctamente',
        data
    }
}

export const updateMovement = async (idMovement: string, movement: Movement): Promise<Response> => {
    const { data, error } = await supabase
        .from('Movement')
        .update({
            name: movement.name,
            amount: movement.amount,
            category: movement.category,
            dueDate: movement.dueDate,
            type: movement.type,
            state: movement.state
        })
        .eq('id', idMovement)
        .select()

    return {
        success: !error,
        message: error ? 'Ocurrió un error al actualizar el movimiento' : 'Movimiento actualizado correctamente',
        data
    }
}

export const getAllBudgets = async (idUser: string): Promise<Response> => {
    const { data, error } = await supabase
        .from('Budget')
        .select("*")
        .eq('id_user', idUser)
        .order('month')
        .order('year')

    if (error) {
        return {
            success: !error,
            message: error ? 'Ocurrió un error al obtener los movimientos' : 'Movimientos obtenidos correctamente',
            data: []
        }
    }

    const { data: movements, error: movementsError } = await supabase
        .from('Movement')
        .select("*")
        .in('id_budget', data.map((budget: any) => budget.id))
        .order('created_at')

    if (movementsError) {
        return {
            success: !movementsError,
            message: movementsError ? 'Ocurrió un error al obtener los movimientos' : 'Movimientos obtenidos correctamente',
            data: []
        }
    }

    const budgets = data.map((budget: any) => {
        return {
            id: budget.id,
            month: budget.month,
            year: budget.year,
            isDefault: budget.is_default,
            incomes: movements.filter((income) => income.id_budget === budget.id && income.type_budget === 1).map((income: any) => {
                return {
                    id: income.id,
                    name: income.name,
                    amount: income.amount,
                    category: income.category,
                    dueDate: income.dueDate,
                    type: income.type,
                    state: income.state
                }
            }),
            expenses: movements.filter((expense) => expense.id_budget === budget.id && expense.type_budget === 2).map((expense: any) => {
                return {
                    id: expense.id,
                    name: expense.name,
                    amount: expense.amount,
                    category: expense.category,
                    dueDate: expense.dueDate,
                    type: expense.type,
                    state: expense.state
                }
            })
        }
    })

    return {
        success: !error,
        message: error ? 'Ocurrió un error al obtener los movimientos' : 'Movimientos obtenidos correctamente',
        data: budgets
    }
}

export const removeMovement = async (idMovements: string[]): Promise<Response> => {
    const { data, error } = await supabase
        .from('Movement')
        .delete()
        .in('id', idMovements)

    return {
        success: !error,
        message: error ? 'Ocurrió un error al eliminar el movimiento' : 'Movimiento eliminado correctamente',
        data
    }
}

export const setDefaultBudget = async (idBudget: string): Promise<Response> => {
    const { data, error } = await supabase
        .from('Budget')
        .update({ is_default: true })
        .eq('id', idBudget)

    return {
        success: !error,
        message: error ? 'Ocurrió un error al establecer el presupuesto como predeterminado.' : 'Movimiento establecido como presupuesto predeterminado.',
        data
    }
}