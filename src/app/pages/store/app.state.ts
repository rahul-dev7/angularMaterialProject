import { RecordsState } from "./record.state"
import { recordReducer } from "./records.reducer"

export interface AppState {
    records: RecordsState;
}

export const appReducer = {
    records:recordReducer
}

// console.log(recordReducer, 'sjsjsj');