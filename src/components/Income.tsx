import { Props } from "../interfaces/props"
import Table from "./Table"

const Income = (props: Props) => {
    return (
        <Table values={ props.values } setValues={ props.setValues } />
    )
}

export default Income