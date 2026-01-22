export const USER_SIGNIN_ACTION_TYPES = {
    SET_USER: 'SET_USER',
}

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNIN_ACTION_TYPES.SET_USER:
            return {...state, user: action.payload};
        default:
            return state;
    }


}

export default userReducer;