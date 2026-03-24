export const CAPTAIN_ACTION_TYPES = {
    SET_CAPTAIN: 'SET_CAPTAIN',
}

const initialState = null

const captainReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAPTAIN_ACTION_TYPES.SET_CAPTAIN:
            return action.payload;
        default:
            return state;
    }


}

export default captainReducer;