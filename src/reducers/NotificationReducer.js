import { ACTION_TYPES } from '../actions/NotificationActions';

const initialState = {
    list: []
}
export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }
            
    
        default:
            return state;
    }
}