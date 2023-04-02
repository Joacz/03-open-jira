import { FunctionComponent, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry, EntryStatus } from 'interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

export interface EntriesProps {
  children: JSX.Element | JSX.Element[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FunctionComponent<EntriesProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description: description,
      createdAt: Date.now(),
      status: 'pending',
    };

    dispatch({ type: 'Entry - Add New', payload: newEntry });
  };

  const changeStatus = (id: string, status: EntryStatus) => {
    dispatch({ type: 'Entry - Find By Id', payload: { id, status } });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, changeStatus }}>
      {children}
    </EntriesContext.Provider>
  );
};
