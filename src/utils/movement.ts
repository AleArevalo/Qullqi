import { Category } from "../interfaces/category"

export const allCategories: Category[] = [
    { id: 1, name: '🚪 Alquiler', type: 'expenses' },
    { id: 2, name: '🛍️ Compras', type: 'expenses' },
    { id: 3, name: '🍕 Comida', type: 'expenses' },
    { id: 4, name: '🏦 Créditos', type: 'expenses' },
    { id: 5, name: '🚎 Transporte', type: 'expenses' },
    { id: 6, name: '💳 Tarjeta de crédito', type: 'expenses' },
    { id: 7, name: '🍿 Entrenamiento', type: 'expenses' },
    { id: 8, name: '🧑‍🏫 Educación', type: 'expenses' },
    { id: 9, name: '🏠 Servicios casa', type: 'expenses' },
    { id: 10, name: '🧑‍🧑‍🧒‍🧒 Ayudas familia', type: 'expenses' },
    { id: 11, name: '📊 Inversión', type: 'expenses' },
    { id: 12, name: '✈️ Viajes', type: 'expenses' },
    { id: 13, name: '🛡️ Seguros', type: 'expenses' },
    { id: 14, name: '🏥 Salud', type: 'expenses' },
    { id: 15, name: '🐶 Mascotas', type: 'expenses' },
    { id: 16, name: '⚽️ Hobbies', type: 'expenses' },
    { id: 17, name: '💸 Otros', type: 'expenses' },
    { id: 18, name: '💰 Sueldo', type: 'incomes' },
    { id: 19, name: '🚪 Alquiler', type: 'incomes' },
    { id: 20, name: '👨🏻‍💻 Freelance', type: 'incomes' },
    { id: 21, name: '💸 Otros', type: 'incomes' }
]

export const allTypes: Category[] = [
    { id: 1, name: '💵 Manual' },
    { id: 2, name: '💳 Suscripción' }
]

export const allStates: Category[] = [
    { id: 1, name: '⌛️ Pendiente' },
    { id: 2, name: '✅ Pagada' },
    { id: 3, name: '❌ Rechazada' },
    { id: 4, name: '🚫 Anulada' },
    { id: 5, name: '⛔️ Cancelada' }
]