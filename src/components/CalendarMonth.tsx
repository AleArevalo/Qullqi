import { useState } from 'react';

import { IconChevronLeft, IconChevronRight, IconChevronUp, IconChevronDown } from '@tabler/icons-react';

import { PropsHistory } from '../interfaces/props';

const Calendar = (props: PropsHistory) => {
    const [ isTooltipVisible, setTooltipVisible ] = useState(false)
    const [ optionYear, setOptionYear ] = useState(new Date().getFullYear())
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

    const handleChangeDate = (year: number, month: number, isTooltipVisible: boolean = false) => {
        if (isTooltipVisible === true) {
            toggleTooltip()
        }

        props.handleChangeDate(year, month)
    }

    return (
        <div className="relative">
            <div className="flex sm:flex-col flex-row justify-center items-center sm:space-y-4 p-4 sm:p-0 gap-8 sm:gap-0">
                <button className="hidden sm:block" onClick={ () => handleChangeDate(props.yearSelected, props.monthSelected + 1) } disabled={ props.monthSelected === 11 }>
                    <IconChevronUp className={ `${ props.monthSelected === 0 ? 'text-gray-600' : 'dark:text-white hover:text-gray-400' }` } />
                </button>
                <button className="block sm:hidden" onClick={ () => handleChangeDate(props.yearSelected, props.monthSelected - 1) } disabled={ props.monthSelected === 0 }>
                    <IconChevronLeft className={ `${ props.monthSelected === 0 ? 'text-gray-600' : 'dark:text-white hover:text-gray-400' }` } />
                </button>
                <button
                    onClick={ toggleTooltip }
                    className="dark:text-white hover:text-gray-400"
                >
                    { months[props.monthSelected] } { props.yearSelected }
                </button>
                <button className="hidden sm:block" onClick={ () => handleChangeDate(props.yearSelected, props.monthSelected - 1)} disabled={ props.monthSelected === 0 }>
                    <IconChevronDown className={ `${ props.monthSelected === 11 ? 'text-gray-600' : 'dark:text-white hover:text-gray-400' }` } />
                </button>
                <button className="block sm:hidden" onClick={ () => handleChangeDate(props.yearSelected, props.monthSelected + 1)} disabled={ props.monthSelected === 11 }>
                    <IconChevronRight className={ `${ props.monthSelected === 11 ? 'text-gray-600' : 'dark:text-white hover:text-gray-400' }` } />
                </button>
            </div>

            { isTooltipVisible && (
                <div className="absolute z-10 bottom-3/4 mb-2 left-1/2 transform -translate-x-1/2 w-48 bg-gray-200 dark:bg-gray-800 text-white border-2 border-gray-600 text-sm rounded-lg py-2 px-3">
                    <div className="flex justify-between mb-2">
                        <button onClick={ () => setOptionYear(optionYear - 1) }>
                            <IconChevronLeft className="text-black dark:text-white" />
                        </button>
                        <input
                            type="text"
                            className="w-1/2 bg-transparent text-center text-black dark:text-white"
                            value={ optionYear }
                            onChange={ (e) => setOptionYear(Number(e.target.value)) }
                        />
                        <button onClick={ () => setOptionYear(optionYear + 1) }>
                            <IconChevronRight className="text-black dark:text-white" />
                        </button>
                    </div>
                    <div>
                        { months.map((month, index) => (
                            <button
                                key={ index }
                                className={ `${ props.monthSelected === index ? 'bg-purple-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700' } text-black dark:text-white px-2 py-2 rounded` }
                                onClick={ () => handleChangeDate(optionYear, index, true) }
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