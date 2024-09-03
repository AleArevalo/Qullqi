import { Movement } from "./movement";

export interface Props {
    values: Movement[]
    setValues: React.Dispatch<React.SetStateAction<Movement[]>>
}