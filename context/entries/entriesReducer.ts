import { Entry, EntryStatus } from 'interfaces';
import { EntriesState } from './EntriesProvider';

type EntriesType =
  | { type: 'Entry - Add New', payload: Entry; }
  | { type: 'Entry - Update Entry', payload: Entry; }
  | { type: 'Entry - Refresh Data', payload: Entry[]; };



export const entriesReducer = (state: EntriesState, action: EntriesType): EntriesState => {
  switch (action.type) {
    case 'Entry - Add New':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case 'Entry - Refresh Data':
      return {
        ...state,
        entries: [...action.payload]
      };
    case 'Entry - Update Entry':
      const newEntry = state.entries.filter(e => e._id === action.payload._id);

      if (newEntry.length > 0) {

        newEntry[0].status = action.payload.status;


        return {
          ...state,
          entries: [...state.entries.filter(e => e._id !== action.payload._id), ...newEntry]
        };
      };
    default:
      return state;
  }
};
