import { authReducer, initialState } from "../../reducer";
import { AUTH_ACTIONS } from "../../actions/consts";

test("test Login  state", () => {
    let action = {
        type: `${AUTH_ACTIONS.AUTH}`,
        payload: {
            user: "testTesttest",
        },
    };
    let expected = authReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        authData: action.payload,
    });
});

test("test logout  state", () => {
    let action = {
        type: `${AUTH_ACTIONS.LOGOUT}`,
        payload: null,
    };
    let expected = authReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        authData: null,
    });
});
