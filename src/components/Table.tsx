import { useState } from "react"

import { Props } from "../interfaces/props"
import { Movement } from "../interfaces/movement"
import { Category } from "../interfaces/category"

const Table = (props: Props) => {
    const [ categories ] = useState<Category[]>([
        { id: 1, name: 'Alquiler' },
        { id: 2, name: 'Compras' },
        { id: 3, name: 'Comida' },
        { id: 4, name: 'Créditos' },
        { id: 5, name: 'Transporte' },
        { id: 6, name: 'Tarjetas de crédito' },
        { id: 7, name: 'Ayudas familiares' },
        { id: 8, name: 'Inversión' },
        { id: 9, name: 'Viajes' },
        { id: 10, name: 'Seguros' },
        { id: 11, name: 'Otros' }
    ])
    const [ types ] = useState<Category[]>([
        { id: 1, name: 'Manual' },
        { id: 2, name: 'Suscripción' }
    ])
    const [ states ] = useState<Category[]>([
        { id: 1, name: 'Pendiente' },
        { id: 2, name: 'Pagada' },
        { id: 3, name: 'Rechazada' },
        { id: 4, name: 'Anulada' },
        { id: 5, name: 'Cancelada' }
    ])

    const addItem = () => {
        props.setValues([
            ...props.values,
            {
                name: '',
                amount: 0,
                category: '',
                dueDate: '',
                type: '',
                state: ''
            }
        ])
    }

    const handleChangeInput = (key: keyof Movement, value: string | number, index: number) => {
        const newValues = [...props.values];
        (newValues[index] as any)[key] = value;
        props.setValues(newValues);
    }

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Concepto
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Monto
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Categoría
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Fecha Vencimiento
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Tipo
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Estado
                    </th>
                </tr>
            </thead>
            <tbody>
                { props.values.map((item, index) => (
                    <tr key={`item-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <td>
                            <input type="text" className="bg-white dark:bg-gray-800 text-black dark:text-white w-full h-[50px]" value={ item.name} onChange={ (e) => handleChangeInput('name', e.target.value, index) } />
                        </td>
                        <td>
                            <input type="text" className="bg-white dark:bg-gray-800 text-black dark:text-white w-full h-[50px]" value={ item.amount} onChange={ (e) => handleChangeInput('amount', e.target.value, index) } />
                        </td>
                        <td>
                            <select className="bg-white dark:bg-gray-800 text-black dark:text-white w-full h-[50px]" value={ item.category } onChange={ (e) => handleChangeInput('category', e.target.value, index) }>
                                <option value="" disabled>Seleccionar</option>
                                { categories.map((category) => (
                                    <option key={ category.id } value={ category.id }>{ category.name }</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input type="date" className="bg-white dark:bg-gray-800 text-black dark:text-white text-center w-full h-[50px]" value={ item.dueDate } onChange={ (e) => handleChangeInput('dueDate', e.target.value, index) } />
                        </td>
                        <td>
                            <select className="bg-white dark:bg-gray-800 text-black dark:text-white w-full h-[50px]" value={ item.type } onChange={ (e) => handleChangeInput('type', e.target.value, index) }>
                                <option value="" disabled>Seleccionar</option>
                                { types.map((type) => (
                                    <option key={ type.id } value={ type.id }>{ type.name }</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select className="bg-white dark:bg-gray-800 text-black dark:text-white w-full h-[50px]" value={ item.state } onChange={ (e) => handleChangeInput('state', e.target.value, index) }>
                                <option value="" disabled>Seleccionar</option>
                                { states.map((state) => (
                                    <option key={ state.id } value={ state.id }>{ state.name }</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                    <td colSpan={7} className="px-6 py-4" onClick={ addItem }>
                        + Nuevo elemento
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table