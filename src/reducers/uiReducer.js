import { types } from "../types/types"



const initialState = {
    isLoading: false,
    error: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                error: action.payload
            }
        case types.uiRemoveError:
            return {
                ...state,
                error: null
            }

        case types.uiStartLoading:
            return {
                ...state,
                isLoading: true
            }
        case types.uiFinishLoading:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}
