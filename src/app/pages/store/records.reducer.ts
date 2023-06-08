import { createReducer, on } from "@ngrx/store";
import { initialState } from "./record.state";
import { addRecord, deleteRecord, updateRecord } from "./records.action";

const _recordsReducer = createReducer(
    initialState,   
    on(addRecord, (state, action) => {
        let record = {...action.record};
        record.id = (state.records.length + 1 ).toString();
        return {
            ...state,
            records: [...state.records, record] 
        }
    }),
    on(updateRecord, (state, action) => {
        const updateRecords = state.records.map(record => {
            return action.record.id === record.id ? action.record : record
        });
        return {
            ...state,
            records: updateRecords
        }
    }),
    on(deleteRecord, (state, {id}) => {
        const updateRecords = state.records.filter(record => {
            return  record.id != id;
        });
        return {
            ...state,
            records: updateRecords
        }
    })
);


export function recordReducer(state, action) {
    console.log('reducer', _recordsReducer(state, action));
    return _recordsReducer(state, action);
}