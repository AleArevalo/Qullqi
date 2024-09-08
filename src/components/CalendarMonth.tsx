import { useState } from 'react';

const Calendar = () => {
    const [ isTooltipVisible, setTooltipVisible ] = useState(false)
    const [ months ] = useState<string[]>([
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic'
    ])

    const toggleTooltip = () => {
      setTooltipVisible(!isTooltipVisible)
    }

    return (
        <div className="relative">
            <button
                onClick={ toggleTooltip }
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                { months[new Date().getMonth()] }
            </button>

            { isTooltipVisible && (
                <div className="absolute z-10 bottom-full mb-2 w-48 bg-gray-800 text-white text-sm rounded py-2 px-3">
                    <p className="mb-2">2024</p>
                    { months.map((month, index) => (
                        <button
                            key={ index }
                            className="bg-gray-800 text-white px-2 py-1 rounded mr-2"
                        >
                            { month }
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Calendar