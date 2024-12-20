import { useState, useEffect, useCallback } from "react"

import { debounce } from 'lodash'
import { IconPlus, IconChartPieFilled, IconTrashFilled, IconSearch } from "@tabler/icons-react"

import { Props } from "../interfaces/props"
import { Movement } from "../interfaces/movement"
import { Category } from "../interfaces/category"
import { formatMoneyString } from "../utils/money"
import { allCategories, allTypes, allStates } from "../utils/movement"

const Table = (props: Props) => {
    const [ textFilter, setTextFilter ] = useState<string>('')
    const [ selectedItems, setSelectedItems ] = useState<string[]>([])
    const [ categories ] = useState<Category[]>(allCategories)
    const [ types ] = useState<Category[]>(allTypes)
    const [ states ] = useState<Category[]>(allStates)
    const [ arrayMovement, setArrayMovement ] = useState<Movement[]>([])

    // Creamos una función debounced para llamar a onValorChange
    const debouncedOnChange = useCallback(
        debounce((index: number, value: Movement) => {
            props.setValues(index, props.type, value)
        }, 500), // Ajusta el retraso según sea necesario
        [ props.values ]
    )

    const handleChangeInput = (key: keyof Movement, value: string | number, id: string) => {
        value = key === 'amount' ? formatMoneyString(value as string) : value
        const index = arrayMovement.findIndex((item) => item.id === id)

        const newValues = [...props.values];
        (newValues[index] as any)[key] = value
        setArrayMovement([ ...newValues ])
        debouncedOnChange(index, newValues[index]) // Llama a la función debounced
    }

    const handleSelectItem = (index: string) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(item => item !== index))
        } else {
            setSelectedItems([...selectedItems, index])
        }
    }

    const handleSelectAll = () => {
        if (selectedItems.length === props.values.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(props.values.map((item) => item.id))
        }
    }

    const deleteItem = () => {
        const arrayFiltered = arrayMovement.filter((item) => !selectedItems.includes(item.id))
        props.deleteValues(selectedItems, props.type)
        setArrayMovement(arrayFiltered)
        setSelectedItems([])
    }

    const handleNewItem = () => {
        const newMovement: Movement = {
            id: '',
            name: '',
            amount: '',
            category: '',
            dueDate: '',
            type: '',
            state: ''
        }
        props.addValues(props.type)
        setArrayMovement([ ...arrayMovement, newMovement ])
    }

    const filterByText = (): Movement[] => {
        const filterText = textFilter.toLowerCase()

        return arrayMovement.filter((item) => {
            const nameMatch = item.name?.toLowerCase().includes(filterText)
    
            const amountMatch = item.amount !== undefined && item.amount.toString().replace(/\$|\./g, '').toLowerCase().includes(filterText)
    
            const dueDateMatch = item.dueDate?.toLowerCase().includes(filterText)
    
            let categoryMatch = false
            if (item.category) {
                const category = allCategories.find(({ id }) => id === Number(item.category))
                categoryMatch = category?.name.toLowerCase().includes(filterText) ?? false
            }
    
            let typeMatch = false
            if (item.type) {
                const type = allTypes.find(({ id }) => id === Number(item.type))
                typeMatch = type?.name.toLowerCase().includes(filterText) ?? false
            }
    
            let stateMatch = false
            if (item.state) {
                const state = allStates.find(({ id }) => id === Number(item.state))
                stateMatch = state?.name.toLowerCase().includes(filterText) ?? false
            }
    
            return nameMatch || amountMatch || categoryMatch || dueDateMatch || typeMatch || stateMatch
        }).map((item, index) => {
            return {
                ...item,
                id: item.id ?? index
            }
        })
    }

    // Limpiamos la función debounced al desmontar el componente
    useEffect(() => {
        return () => {
            debouncedOnChange.cancel()
        }
    }, [ debouncedOnChange ])

    useEffect(() => {
        setArrayMovement(props.values)
    }, [ props.values ])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <div className="flex gap-4 items-center justify-between p-4 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-4">
                    { selectedItems.length > 0 &&
                        <button className="inline-flex items-center text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-1.5" type="button" onClick={ deleteItem }>
                            <IconTrashFilled />
                        </button>
                    }
                    { props.values.length > 0 &&
                        <button className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1.5" type="button" onClick={ () => props.setChangeTable?.(!props.isTable) }>
                            <IconChartPieFilled />
                        </button>
                    }
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <IconSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                                        checked={ selectedItems.includes(item.id) }
                                        onChange={ () => handleSelectItem(item.id) }
                                    />
                                </div>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="bg-white dark:bg-gray-800 text-black dark:text-white px-2 sm:px-6 w-full h-[50px]"
                                    value={ item.name}
                                    onChange={ (e) => handleChangeInput('name', e.target.value, item.id) }
                                    maxLength={ 30 }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="bg-white dark:bg-gray-800 text-black dark:text-white px-2 sm:px-6 w-full h-[50px]"
                                    value={ item.amount}
                                    onChange={ (e) => handleChangeInput('amount', e.target.value, item.id) }
                                    maxLength={ 10 }
                                />
                            </td>
                            <td>
                                <select
                                    className="bg-white dark:bg-gray-800 text-black text-center dark:text-white w-full h-[50px]"
                                    value={ item.category }
                                    onChange={ (e) => handleChangeInput('category', e.target.value, item.id) }
                                >
                                    <option value="" disabled>Seleccionar</option>
                                    { categories.filter((category) => category.type === props.type).map((category) => (
                                        <option key={ category.id } value={ category.id }>{ category.name }</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    className="bg-white dark:bg-gray-800 text-black dark:text-white text-center w-full h-[50px]"
                                    value={ item.dueDate }
                                    onChange={ (e) => handleChangeInput('dueDate', e.target.value, item.id) }
                                />
                            </td>
                            <td>
                                <select
                                    className="bg-white dark:bg-gray-800 text-black text-center dark:text-white px-4 sm:px-6 w-full h-[50px]"
                                    value={ item.type }
                                    onChange={ (e) => handleChangeInput('type', e.target.value, item.id) }
                                >
                                    <option value="" disabled>Seleccionar</option>
                                    { types.filter((category) => category.type === props.type).map((type) => (
                                        <option key={ type.id } value={ type.id }>{ type.name }</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    className="bg-white dark:bg-gray-800 text-black text-center dark:text-white px-4 sm:px-6 w-full h-[50px]"
                                    value={ item.state }
                                    onChange={ (e) => handleChangeInput('state', e.target.value, item.id) }
                                >
                                    <option value="" disabled>Seleccionar</option>
                                    { states.filter((state) => state.type === props.type).map((state) => (
                                        <option key={ state.id } value={ state.id }>{ state.name }</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    { textFilter.length === 0 &&
                        <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td colSpan={ 7 } onClick={ handleNewItem }>
                                <div className="flex gap-2 px-6 py-4">
                                    <IconPlus width={ 20 } height={ 20 } />
                                    Nuevo elemento
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table