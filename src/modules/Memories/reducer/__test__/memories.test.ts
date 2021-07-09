
import { memoriesReducer, initialState } from "../../reducer";
import { MEMORIES_ACTIONS } from "../../actions/consts";
import { ASYNC_STATUS } from "../../../../redux/consts";
describe("testing memories reducer", () => {
    test("initial state", () => {
        let expected = memoriesReducer(initialState, null);
        expect(expected).toBe(initialState);
    });
});

test("test Memory pending state", () => {
    let action = {
        type: `${MEMORIES_ACTIONS.GET_MEMORIES}`,
        payload: null,
        error: null,
    };
    let expected = memoriesReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        status: ASYNC_STATUS.LOADING,
        data: [],
        error: null,
    });
});

test("test Memory success state", () => {
    let action = {
        type: `${MEMORIES_ACTIONS.GET_MEMORIES_SUCCESS}`,
        payload: {
            data: [
                {
                    name: "Asim Rzayev",
                    title: "Test",
                    description: "Test",
                    memorytype: "ADVICE",
                },
            ],
            currentPage: 1,
            numberOfPage: 5,
            __v: 0,
        },
        error: null,
    };
    let expected = memoriesReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        status: ASYNC_STATUS.SUCCESS,
        data: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPage,
        error: null,
    });
});

test("test Memory error state", () => {
    let action = {
        type: `${MEMORIES_ACTIONS.GET_MEMORIES_ERROR}`,
        payload: null,
        error: ["something went wrong"],
    };
    let expected = memoriesReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        status: ASYNC_STATUS.ERROR,
        data: [],
        error: action.error,
    });
});

test("test Memory Search state", () => {
    let action = {
        type: `${MEMORIES_ACTIONS.GET_MEMORIES_BY_SEARCH}`,
        payload: {
            data: {
                name: "Asim Rzayev",
                title: "Test",
                description: "Test",
                memorytype: "ADVICE",
            },
            __v: 0,
        },
        error: null,
    };
    let expected = memoriesReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        status: ASYNC_STATUS.SUCCESS,
        data: action.payload.data,
        error: null,
    });
});

test("test Memory Create state", () => {
    let action = {
        type: `${MEMORIES_ACTIONS.CREATE_MEMORIES}`,
        payload: null,
        error: null,
    };
    let expected = memoriesReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        status: ASYNC_STATUS.LOADING,
        data: [...initialState.data],
        error: null,
    });
});

test("test Memory Create Success state", () => {
    let action = {
        type: `${MEMORIES_ACTIONS.CREATE_MEMORIES_SUCCESS}`,
        payload: {
            name: "Asim Rzayev",
            title: "Test",
            description: "Test",
            memorytype: "ADVICE",
        },
        error: null,
    };
    let expected = memoriesReducer(initialState, action);

    expect(expected).toStrictEqual({
        ...initialState,
        status: ASYNC_STATUS.SUCCESS,
        data: [...initialState.data, action.payload],
        error: null,
    });
});
