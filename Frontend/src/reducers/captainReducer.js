export const CAPTAIN_SIGNIN_ACTION_TYPES = {
    SET_CAPTAIN: 'SET_CAPTAIN',
}

const initialState = {
    captain: null,
};

const captainReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAPTAIN_SIGNIN_ACTION_TYPES.SET_CAPTAIN:
            return {...state, captain: action.payload};
        default:
            return state;
    }


}

export default captainReducer;