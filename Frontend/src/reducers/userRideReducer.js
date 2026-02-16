export const USER_RIDE_ACTION_TYPES = {
    SET_PICKUP: 'SET_PICKUP',
    SET_DROP: 'SET_DROP',
    SET_PICKUP_COORDS: 'SET_PICKUP_COORDS',
    SET_DROP_COORDS: 'SET_DROP_COORDS',
    SET_SEARCHED: 'SET_SEARCHED',
    SET_SELECTED_RIDE: 'SET_SELECTED_RIDE',
    SET_USER_LOCATION: 'SET_USER_LOCATION',
    SET_USER_CITY: 'SET_USER_CITY',
    SET_ACTIVE_FIELD: 'SET_ACTIVE_FIELD',
}

const initialState = {
    pickup: "",
    drop: "",
    pickupCoords: null,
    dropCoords: null,
    searched: false,
    selectedRide: null,
    userLocation: null,
    userCity: null,
};

const userRideReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_RIDE_ACTION_TYPES.SET_PICKUP:
            return {...state, pickup: action.payload};
        case USER_RIDE_ACTION_TYPES.SET_DROP:
            return {...state, drop: action.payload};
        case USER_RIDE_ACTION_TYPES.SET_PICKUP_COORDS:
            return {...state, pickupCoords: action.payload};
        case USER_RIDE_ACTION_TYPES.SET_DROP_COORDS:
            return {...state, dropCoords: action.payload};
        case USER_RIDE_ACTION_TYPES.SET_SEARCHED:
            return {...state, searched: action.payload};
        case USER_RIDE_ACTION_TYPES.SET_SELECTED_RIDE:
            return {...state, selectedRide: action.payload};
        case USER_RIDE_ACTION_TYPES.SET_USER_LOCATION:
            return {...state, userLocation: action.payload};
        case USER_RIDE_ACTION_TYPES.SET_USER_CITY:
            return {...state, userCity: action.payload};
        default:
            return state;
    }


}

export default userRideReducer;