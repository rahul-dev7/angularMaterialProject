import { RecordModel } from "src/app/common/models/record";

export interface RecordsState {
    records: RecordModel[];
}

export const initialState: RecordsState = {
    records: [
        {id: '1', title: 'Hydrogen', startDate: '22-06-2023', dueDate: '22-06-2023', attachment: 'res'}
    ]
};
