import { useState } from "react"

import { Props } from "../interfaces/props"
import { Movement } from "../interfaces/movement"
import { Category } from "../interfaces/category"
import { formatMoneyString } from "../utils/money"

const Table = (props: Props) => {
    const [ textFilter, setTextFilter ] = useState<string>('')
    const [ selectedItems, setSelectedItems ] = useState<number[]>([]);
    const [ categories ] = useState<Category[]>([
        { id: 1, name: '🚪 Alquiler' },
        { id: 2, name: '🛍️ Compras' },
        { id: 3, name: '🍕 Comida' },
        { id: 4, name: '🏦 Créditos' },
        { id: 5, name: '🚎 Transporte' },
        { id: 6, name: '💳 Tarjetas de crédito' },
        { id: 7, name: '🧑‍🧑‍🧒‍🧒 Ayudas familiares' },
        { id: 8, name: '📊 Inversión' },
        { id: 9, name: '✈️ Viajes' },
        { id: 10, name: '🛡️ Seguros' },
        { id: 11, name: '💸 Otros' }
    ])
    const [ types ] = useState<Category[]>([
        { id: 1, name: '💵 Manual' },
        { id: 2, name: '💳 Suscripción' }
    ])
    const [ states ] = useState<Category[]>([
        { id: 1, name: '⌛️ Pendiente' },
        { id: 2, name: '✅ Pagada' },
        { id: 3, name: '❌ Rechazada' },
        { id: 4, name: '🚫 Anulada' },
        { id: 5, name: '⛔️ Cancelada' }
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
        value = key === 'amount' ? formatMoneyString(value as string) : value

        const newValues = [...props.values];
        (newValues[index] as any)[key] = value;
        props.setValues(newValues);
    }

    const handleSelectItem = (index: number) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(item => item !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const handleSelectAll = () => {
        if (selectedItems.length === props.values.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(props.values.map((_item, index) => index));
        }
    };

    const deleteItem = () => {
        props.setValues(props.values.filter((_item, index) => !selectedItems.includes(index)));
        setSelectedItems([]);
    };

    const filterByText = (): Movement[] => {
        return props.values.filter((item) => {
            return item?.name?.toLowerCase().includes(textFilter.toLowerCase())
        })
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
                <div className="flex items-center space-x-4">
                    { selectedItems.length > 0 &&
                        <button className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={ deleteItem }>
                            Delete
                        </button>
                    }
                    <button className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        Aplicar filtro
                    </button>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Filtrar por texto"
                        value={ textFilter }
                        onChange={ (e) => setTextFilter(e.target.value) }
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={ selectedItems.length === props.values.length }
                                    onChange={ handleSelectAll }
                                />
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
                    { filterByText().map((item, index) => (
                        <tr key={ `item-${ index }` } className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked={ selectedItems.includes(index) }
                                        onChange={ () => handleSelectItem(index) }
                                    />
                                </div>
                            </td>
                            <td>
                                <input type="text" className="bg-white dark:bg-gray-800 text-black dark:text-white px-6 w-full h-[50px]" value={ item.name} onChange={ (e) => handleChangeInput('name', e.target.value, index) } maxLength={ 30 } />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="bg-white dark:bg-gray-800 text-black dark:text-white px-6 w-full h-[50px]"
                                    value={ item.amount}
                                    onChange={ (e) => handleChangeInput('amount', e.target.value, index) }
                                    maxLength={ 10 }
                                />
                            </td>
                            <td>
                                <select className="bg-white dark:bg-gray-800 text-black text-center dark:text-white w-full h-[50px]" value={ item.category } onChange={ (e) => handleChangeInput('category', e.target.value, index) }>
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
                                <select className="bg-white dark:bg-gray-800 text-black text-center dark:text-white w-full h-[50px]" value={ item.type } onChange={ (e) => handleChangeInput('type', e.target.value, index) }>
                                    <option value="" disabled>Seleccionar</option>
                                    { types.map((type) => (
                                        <option key={ type.id } value={ type.id }>{ type.name }</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select className="bg-white dark:bg-gray-800 text-black text-center dark:text-white w-full h-[50px]" value={ item.state } onChange={ (e) => handleChangeInput('state', e.target.value, index) }>
                                    <option value="" disabled>Seleccionar</option>
                                    { states.map((state) => (
                                        <option key={ state.id } value={ state.id }>{ state.name }</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                        <td colSpan={ 7 } className="px-6 py-4" onClick={ addItem }>
                            + Nuevo elemento
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table