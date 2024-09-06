import { Movement } from "../interfaces/movement"
import { Props } from "../interfaces/props"

const Table = (props: Props) => {
    const addItem = () => {
        props.setValues([
            ...props.values,
            {
                name: '',
                amount: 0,
                category: '',
                dueDate: '',
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
                                <option value="1">Opción 1</option>
                                <option value="2">Opción 2</option>
                            </select>
                        </td>
                        <td>
                            <input type="date" className="bg-white dark:bg-gray-800 text-black dark:text-white text-center w-full h-[50px]" value={ item.dueDate } onChange={ (e) => handleChangeInput('dueDate', e.target.value, index) } />
                        </td>
                        <td>
                            <select className="bg-white dark:bg-gray-800 text-black dark:text-white w-full h-[50px]" value={ item.state } onChange={ (e) => handleChangeInput('state', e.target.value, index) }>
                                <option value="" disabled>Seleccionar</option>
                                <option value="1">Opción 1</option>
                                <option value="2">Opción 2</option>
                            </select>
                        </td>
                    </tr>
                ))}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                    <td colSpan={6} className="px-6 py-4" onClick={ addItem }>
                        + Nuevo elemento
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table