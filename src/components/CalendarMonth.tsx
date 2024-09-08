import { useState } from 'react';

import { IconChevronLeft, IconChevronRight, IconChevronUp, IconChevronDown } from '@tabler/icons-react';

import { PropsHistory } from '../interfaces/props';

const Calendar = (props: PropsHistory) => {
    const [ isTooltipVisible, setTooltipVisible ] = useState(false)
    const [ optionYear, setOptionYear ] = useState(new Date().getFullYear())
    const [ yearSelected, setYearSelected ] = useState(props.yearSelected)
    const [ monthSelected, setMonthSelected ] = useState(props.monthSelected)
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
            <div className="flex flex-col items-center space-y-4">
                <button onClick={() => setMonthSelected(monthSelected - 1)} disabled={ monthSelected === 0 }>
                    <IconChevronUp className={monthSelected === 0 ? 'text-gray-600' : 'text-white'} />
                </button>
                <button
                    onClick={ toggleTooltip }
                    className="text-white"
                >
                    { months[monthSelected] } { yearSelected }
                </button>
                <button onClick={() => setMonthSelected(monthSelected + 1)} disabled={ monthSelected === 11 }>
                    <IconChevronDown className={monthSelected === 11 ? 'text-gray-600' : 'text-white'} />
                </button>
            </div>

            { isTooltipVisible && (
                <div className="absolute z-10 bottom-3/4 mb-2 left-1/2 transform -translate-x-1/2 w-48 bg-gray-800 text-white border-2 border-gray-600 text-sm rounded-lg py-2 px-3">
                    <div className="flex justify-between mb-2">
                        <button onClick={ () => setOptionYear(optionYear - 1) }>
                            <IconChevronLeft className="text-white" />
                        </button>
                        <input type="text" className="w-1/2 bg-transparent text-center" value={ optionYear } onChange={ (e) => setOptionYear(Number(e.target.value)) } />
                        <button onClick={ () => setOptionYear(optionYear + 1) }>
                            <IconChevronRight className="text-white" />
                        </button>
                    </div>
                    <div>
                        { months.map((month, index) => (
                            <button
                                key={ index }
                                className={`${monthSelected === index ? 'bg-purple-500' : 'bg-gray-800 hover:bg-gray-700'} text-white px-2 py-2 rounded`}
                                onClick={ () => {
                                    setMonthSelected(index)
                                    setYearSelected(optionYear)
                                    toggleTooltip()
                                }}
                            >
                                { month }
                            </button>
                        ))}
                    </div>
                    <div className="text-center mt-2">
                        <button className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded text-xs" onClick={ toggleTooltip }>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Calendar