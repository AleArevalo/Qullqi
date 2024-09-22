import { useState } from "react"

import { Props } from "../interfaces/props"
import PieChart from "./PieChart"
import Table from "./Table"

export const Movements = (props: Props) => {
    const [ isTableView, setTableView ] = useState(true)

    return (
        <>
            { isTableView ?
                <Table
                    type={ props.type}
                    values={ props.values }
                    addValues={ props.addValues }
                    setValues={ props.setValues }
                    deleteValues={ props.deleteValues }
                    isTable={ isTableView }
                    setChangeTable={ setTableView}
                />
                :
                <PieChart
                    type={ props.type }
                    values={ props.values }
                    isChart={ isTableView }
                    setChangeChart={ setTableView}
                />
            }
        </>
    )
}