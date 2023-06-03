import { FunctionComponent, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry, EntryStatus } from 'interfaces';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from 'apis';

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

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });

    dispatch({ type: 'Entry - Add New', payload: data });
  };

  const changeStatus = async (entry: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        status: entry.status,
        description: entry.description,
      });

      dispatch({ type: 'Entry - Update Entry', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const refreshEntries = async () => {
    const resp = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: 'Entry - Refresh Data', payload: resp.data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, changeStatus }}>
      {children}
    </EntriesContext.Provider>
  );
};
