import { Props } from "../interfaces/props"
import Table from "./Table"

const Expenses = (props: Props) => {
    return (
        <Table values={ props.values } />
    )
}

export default Expenses