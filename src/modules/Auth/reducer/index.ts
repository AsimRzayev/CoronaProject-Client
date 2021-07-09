import { AUTH_ACTIONS } from "../actions/consts";
export const initialState = {
    authData: null,
};
export function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case AUTH_ACTIONS.AUTH:
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.payload })
            );
            return { ...state, authData: action?.payload };
        case AUTH_ACTIONS.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}
