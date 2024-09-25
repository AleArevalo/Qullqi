import { Props } from "../interfaces/props"
import PieChart from "./PieChart"
import Table from "./Table"

export const Movements = (props: Props) => {
    return (
        <>
            { props.isTable ?
                <Table
                    type={ props.type}
                    values={ props.values }
                    addValues={ props.addValues }
                    setValues={ props.setValues }
                    deleteValues={ props.deleteValues }
                    isTable={ props.isTable }
                    setChangeTable={ props.setChangeTable}
                />
                :
                <PieChart
                    type={ props.type }
                    values={ props.values }
                    isChart={ props.isTable }
                    setChangeChart={ props.setChangeTable}
                />
            }
        </>
    )
}