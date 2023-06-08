import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecordsState } from "./record.state";

// const getRecordsState = createFeatureSelector<RecordState>('records');
const Test = 1000;
 const getRecordsState = createFeatureSelector<RecordsState>('records');

export const getRecords = createSelector(getRecordsState, (state) => {
    console.log( 'sjsjsj');
    return state.records;
});

export const getRecordById = createSelector(getRecordsState, (state, props) => {
    return state.records.find((record) => record.id === props.id);
})
