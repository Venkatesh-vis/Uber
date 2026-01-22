
export const SHARED_ACTION_TYPES = {
    SET_MESSAGE: "SET_MESSAGE",
    SET_WARNING_DIALOG: "SET_WARNING_DIALOG"
}

const initialState = {
    message: null,
    showWarning: false,
};

const sharedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHARED_ACTION_TYPES.SET_MESSAGE:
            return { ...state, message: action.payload };
        case SHARED_ACTION_TYPES.SET_WARNING_DIALOG:
            return { ...state, showWarning: action.payload };
        default:
            return state;
    }
};

export default sharedReducer;