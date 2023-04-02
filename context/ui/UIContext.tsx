import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  addmenuOpen: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  openAddMenu: () => void;
  closeAddMenu: () => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
