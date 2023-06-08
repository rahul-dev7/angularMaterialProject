import { createAction, props } from "@ngrx/store";
import { RecordModel } from "src/app/common/models/record";
export const ADD_RECORD_ACTION = 'add record';
export const UPDATE_RECORD_ACTION = 'update record';
export const DELETE_RECORD_ACTION = 'delete record';

export const addRecord = createAction(ADD_RECORD_ACTION, props<{record: RecordModel}>());
export const updateRecord = createAction(UPDATE_RECORD_ACTION, props<{record: RecordModel}>());
export const deleteRecord = createAction(DELETE_RECORD_ACTION, props<{id: string}>());