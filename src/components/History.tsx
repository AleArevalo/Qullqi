import { PropsHistory } from "../interfaces/props"
import CalendarMonth from "./CalendarMonth"

const History = (props: PropsHistory) => {
    return (
        <div className="fixed sm:static bottom-0 left-1/2 transform sm:transform-none -translate-x-1/2 bg-black bg-opacity-50 sm:bg-transparent sm:flex sm:flex-col sm:justify-center sm:space-y-4 w-full sm:w-auto">
            <CalendarMonth yearSelected={ props.yearSelected } monthSelected={ props.monthSelected } handleChangeDate={ props.handleChangeDate } />
        </div>
    )   
}

export default History