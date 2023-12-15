const isCollapsed=false;
export const CollApsedReducer = (prevState = { isCollapsed: isCollapsed }, action) => {
    switch (action.type) {
        case "change_collapsed":
            return {
                ...prevState,
                isCollapsed: !prevState.isCollapsed
            }
        default:
            return prevState
    }
}