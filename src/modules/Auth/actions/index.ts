import { AUTH_ACTIONS } from "./consts";
import { authService } from "../service";
export const signin =
    (formData: any, history: any) => async (dispatch: any) => {
        try {
            const { data } = await authService.signin(formData);
            dispatch({ type: AUTH_ACTIONS.AUTH, payload: data });
            history.push("/memories");
        } catch (error) {
            console.log(error);
        }
    };

export const signup =
    (formData: any, history: any) => async (dispatch: any) => {
        try {
            const { data } = await authService.signup(formData);
            dispatch({ type: AUTH_ACTIONS.AUTH, payload: data });
            history.push("/memories");
        } catch (error) {
            console.log(error);
        }
    };
