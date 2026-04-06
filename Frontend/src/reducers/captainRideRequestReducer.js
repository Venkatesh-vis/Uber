export const CAPTAIN_RIDE_REQUEST_ACTION_TYPES = {
    SET_RIDE_REQUESTS: 'SET_RIDE_REQUESTS',
    REMOVE_RIDE_REQUEST: 'REMOVE_RIDE_REQUEST',
    CLEAR_RIDE_REQUESTS: 'CLEAR_RIDE_REQUESTS',
    ACCEPTED_REQUEST: 'ACCEPTED_REQUEST',
    VERIFY_OTP: 'VERIFY_OTP',
};

const initialState = {
    rideRequests: [],
    acceptedRide: null,
};

const captainRideRequestReducer = (state = initialState, action) => {
    switch (action.type) {

        case CAPTAIN_RIDE_REQUEST_ACTION_TYPES.SET_RIDE_REQUESTS:
            return {...state, rideRequests: action.payload};

        case CAPTAIN_RIDE_REQUEST_ACTION_TYPES.REMOVE_RIDE_REQUEST:
            return {...state, rideRequests: action.payload};

        case CAPTAIN_RIDE_REQUEST_ACTION_TYPES.CLEAR_RIDE_REQUESTS:
            return {...state, rideRequests: action.payload};

        case CAPTAIN_RIDE_REQUEST_ACTION_TYPES.ACCEPTED_REQUEST:
            return {...state, acceptedRide: action.payload};

        case CAPTAIN_RIDE_REQUEST_ACTION_TYPES.VERIFY_OTP:
            return {...state, acceptedRide: action.payload};

        default:
            return state;
    }
};

export default captainRideRequestReducer;