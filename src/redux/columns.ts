import { createSlice } from '@reduxjs/toolkit'
import { ColumnsType } from '../types';

const initialState: ColumnsType = {
  "0": {
    name: "Past Launches",
    items: [],
    status: "PAST"
  },
  "1": {
    name: "Launches",
    items: [],
    status: "NOW"
  },
  "2": {
    name: "My Launches",
    items: [],
    status: "MY"
  },
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    updateColumns: (_, action) => {
      return action.payload
    },
  },
})

export const { updateColumns } = columnsSlice.actions

export default columnsSlice.reducer