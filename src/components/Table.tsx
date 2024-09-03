import { Props } from "../interfaces/props"

const Table = (props: Props) => {
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
                { props.values.map((item) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            { item.name }
                        </td>
                        <td className="px-6 py-4">
                            { item.amount }
                        </td>
                        <td className="px-6 py-4">
                            { item.category }
                        </td>
                        <td className="px-6 py-4">
                            { item.dueDate }
                        </td>
                        <td className="px-6 py-4">
                            { item.state }
                        </td>
                    </tr>
                ))}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                    <td colSpan={6} className="px-6 py-4">
                        + Nuevo elemento
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table