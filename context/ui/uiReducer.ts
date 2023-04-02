import { UIState } from './UIProvider';

type UIType =
  | { type: 'UI - Open Menu' }
  | { type: 'UI - Close Menu' }
  | { type: 'UI - Open AddMenu' }
  | { type: 'UI - Close AddMenu' }
  | { type: 'UI - Start Dragging' }
  | { type: 'UI - End Dragging' };


export const uiReducer = (state: UIState, action: UIType) => {
  switch (action.type) {
    case 'UI - Open Menu':
      return {
        ...state,
        sidemenuOpen: true,
      };
    case 'UI - Close Menu':
      return {
        ...state,
        sidemenuOpen: false,
      };

    case 'UI - Open AddMenu':
      return {
        ...state,
        addmenuOpen: true,
      };
    case 'UI - Close AddMenu':
      return {
        ...state,
        addmenuOpen: false,
      };
    case 'UI - Start Dragging':
      return {
        ...state,
        isDragging: true,
      };
    case 'UI - End Dragging':
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};