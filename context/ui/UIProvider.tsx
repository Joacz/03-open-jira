import { FunctionComponent, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  addmenuOpen: boolean;
  isDragging: boolean;
}

export interface Props {
  children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  addmenuOpen: false,
  isDragging: false,
};

export const UIProvider: FunctionComponent<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Menu' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Menu' });
  };

  const openAddMenu = () => {
    dispatch({ type: 'UI - Open AddMenu' });
  };

  const closeAddMenu = () => {
    dispatch({ type: 'UI - Close AddMenu' });
  };

  const startDragging = () => {
    dispatch({ type: 'UI - Start Dragging' });
  };

  const endDragging = () => {
    dispatch({ type: 'UI - End Dragging' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        
        openSideMenu,
        closeSideMenu,

        openAddMenu,
        closeAddMenu,

        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
