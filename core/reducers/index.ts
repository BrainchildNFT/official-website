import { combineReducers } from 'redux';
import { ThemeStatus } from './theme-status';
import { SidebarStatus } from './sidebar-status';

const reducers = combineReducers({
  ThemeStatus,
  SidebarStatus
});

export default reducers;