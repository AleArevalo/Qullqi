import { IconCalendarDown, IconCircleDashedCheck, IconTimelineEventX, IconTrashX } from "@tabler/icons-react"
import Swal from "sweetalert2"

import { PropsController } from "../interfaces/props";
import { ToastSwal } from "../utils/swal-custom";

const Controller = (props: PropsController) => {
    const handleChangeCurrentDate = () => {
        const date = new Date()
        const month = date.toLocaleString('default', { month: 'long' }).toUpperCase()
        const year = date.getFullYear()

        ToastSwal('success', `Fecha actualizada: ${month} ${year}`)

        props.changeDate(year, date.getMonth())
    }

    const handleSetDefault = () => {
        Swal.fire({
            title: "Establecer hoja predeterminada",
            text: "Esta hoja se aplicará como predeterminada para todas las hojas futuras.",
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Aplicar",
            cancelButtonText: `No, no lo hagas`,
            customClass: {
                popup: "dark:bg-gray-700 text-black dark:text-white rounded-3xl",
                confirmButton: "bg-green-500 hover:bg-green-600 text-white",
                cancelButton: "bg-gray-300 dark:bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300 text-black",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                props.setDefaultBudget()
            }
        })
    }

    const handleDeleteCurrent = () => {
        Swal.fire({
            title: "Eliminar hoja actual",
            text: "¿Estás seguro de que quieres eliminar la hoja actual? Esto no se puede deshacer.",
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: `No, no lo hagas`,
            customClass: {
                popup: "dark:bg-gray-700 text-black dark:text-white rounded-3xl",
                confirmButton: "bg-red-500 hover:bg-red-600 text-white",
                cancelButton: "bg-gray-300 dark:bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300 text-black",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                props.removeCurrentBudget()
            }
        })
    }

    const handleDeleteAll = () => {
        Swal.fire({
            title: "Eliminar todas las hojas",
            text: "¿Estás seguro de que quieres eliminar todas las hojas? Esto no se puede deshacer.",
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: `No, no lo hagas`,
            customClass: {
                popup: "dark:bg-gray-700 text-black dark:text-white rounded-3xl",
                confirmButton: "bg-red-500 hover:bg-red-600 text-white",
                cancelButton: "bg-gray-300 dark:bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300 text-black",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                props.removeAllBudget()
            }
        })
    }

    return (
        <div className="flex gap-4 justify-between">
            <div className="flex gap-4">
                <button
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-lg p-2"
                    title="Ver mes actual"
                    onClick={ handleChangeCurrentDate }
                >
                    <IconCalendarDown />
                </button>
                <button
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-lg p-2"
                    title="Establecer predeterminado"
                    onClick={ handleSetDefault }
                >
                    <IconCircleDashedCheck />
                </button>
            </div>
            <div className="flex gap-4">
                <button
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-lg p-2"
                    title="Borrar hoja actual"
                    onClick={ handleDeleteCurrent }
                >
                    <IconTimelineEventX />
                </button>
                <button
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-lg p-2"
                    title="Borrar todas las hojas"
                    onClick={ handleDeleteAll }
                >
                    <IconTrashX />
                </button>
            </div>
        </div>
    )
}

export default Controller