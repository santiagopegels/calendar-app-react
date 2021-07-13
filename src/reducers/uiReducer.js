import { tpyes } from "../types/types";

const initialState = {
    modalOpen: false,

}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case tpyes.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        default:
            return state;
    }
}
