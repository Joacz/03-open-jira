import { Entry, EntryStatus } from 'interfaces';
import { createContext } from 'react';

interface ContextProps {
  entries: Entry[];
  addEntry: (description: string) => void;
  changeStatus: (id: string, status: EntryStatus) => void;
}

export const EntriesContext = createContext({} as ContextProps);
