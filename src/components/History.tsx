import { PropsHistory } from "../interfaces/props"
import CalendarMonth from "./CalendarMonth"

const History = (props: PropsHistory) => {
    return (
        <div className="flex flex-col justify-center space-y-4 sm:mt-0 mt-6">
            <CalendarMonth yearSelected={ props.yearSelected } monthSelected={ props.monthSelected } handleChangeDate={ props.handleChangeDate } />
        </div>
    )   
}

export default History