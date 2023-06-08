import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecordsState } from "./record.state";

const getRecordsState = createFeatureSelector<RecordsState>('records');

export const getRecords = createSelector(getRecordsState, (state) => {
    return state.records;
});

export const getRecordById = createSelector(getRecordsState, (state, props) => {
    return state.records.find((record) => record.id === props.id);
})
