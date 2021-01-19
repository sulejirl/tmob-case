import {SET_COORDINATES} from './actions.type'


const initialState = {
    coordinates: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COORDINATES:
            return {
                ...state,
                coordinates: action.payload
            }
        default:
            return state
    }
}