import { IconCalendarDown, IconCircleDashedCheck, IconTimelineEventX, IconTrashX } from "@tabler/icons-react"

const Controller = () => {
    return (
        <div className="flex gap-4 justify-between">
            <div className="flex gap-4">
                <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded-lg p-2" title="Ver mes actual">
                    <IconCalendarDown />
                </button>
                <button className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg p-2" title="Establecer predeterminado">
                    <IconCircleDashedCheck />
                </button>
            </div>
            <div className="flex gap-4">
                <button className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg p-2" title="Borrar hoja actual">
                    <IconTimelineEventX />
                </button>
               <button className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg p-2" title="Borrar todas las hojas">
                    <IconTrashX />
                </button>
            </div>
        </div>
    )
}

export default Controller