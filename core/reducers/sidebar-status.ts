export const SidebarStatus = (state = false, action: any) => {
  switch (action.type) {
    case "SIDEBAR_UPDATE" :
      state = !state;
      return state;
    default :
      return state;
  }
}