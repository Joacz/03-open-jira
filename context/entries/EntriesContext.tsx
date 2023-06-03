import { Entry } from 'interfaces';
import { createContext } from 'react';

interface ContextProps {
  entries: Entry[];
  addEntry: (description: string) => void;
  changeStatus: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);
