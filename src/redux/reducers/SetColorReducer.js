export const SetColorReducer = (prevState = { color: '' }, action) => {
    let { type, payload } = action
    switch (type) {
        case "change_color":
            return {
                ...prevState,
                color: payload
            }
        default:
            return prevState
    }
}