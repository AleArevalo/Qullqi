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