import { MEMORIES_ACTIONS } from "../actions/consts";
import { ASYNC_STATUS } from "../../../redux/consts";

export const initialState = {
    data: [],
    status: ASYNC_STATUS.IDLE,
    error: null,
};
export function memoriesReducer(state = initialState, action: any | null) {
    switch (action?.type) {
        case MEMORIES_ACTIONS.GET_MEMORIES:
            return {
                ...state,
                status: ASYNC_STATUS.LOADING,
                data: [],
                error: null,
            };
        case MEMORIES_ACTIONS.GET_MEMORIES_BY_SEARCH:
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                data: action.payload.data,
                error: null,
            };
        case MEMORIES_ACTIONS.GET_MEMORIES_SUCCESS:
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                data: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPage,
                error: null,
            };

        case MEMORIES_ACTIONS.GET_MEMORIES_ERROR:
            return {
                ...state,
                status: ASYNC_STATUS.ERROR,
                data: [],
                error: action.error,
            };
        case MEMORIES_ACTIONS.CREATE_MEMORIES:
            return {
                ...state,
                status: ASYNC_STATUS.LOADING,
                data: [...state.data],
                error: null,
            };
        case MEMORIES_ACTIONS.CREATE_MEMORIES_SUCCESS:
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                data: [...state.data, action.payload],
                error: null,
            };
        case MEMORIES_ACTIONS.UPDATE_MEMORIES:
            const updatedMemories = state.data.map((data: any) =>
                data._id === action.payload._id ? action.payload : data
            );
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                data: [...updatedMemories],
                error: null,
            };
        case MEMORIES_ACTIONS.DELETE_MEMORIES:
            return {
                ...state,
                status: ASYNC_STATUS.LOADING,
                data: [...state.data],
                error: null,
            };
        case MEMORIES_ACTIONS.DELETE_MEMORIES_SUCCESS:
            const filteredData = state.data.filter(
                (data: any) => data._id !== action.payload
            );
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                data: [...filteredData],
                error: null,
            };
        case MEMORIES_ACTIONS.LIKE_MEMORIES:
            let data = state.data.map((memory: any) =>
                memory._id === action.payload._id ? action.payload : memory
            );
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                data: data,
                error: null,
            };
        case MEMORIES_ACTIONS.COMMENT_MEMORIES:
            return {
                ...state,
                data: state.data.map((memory: any) => {
                    if (memory._id === +action.payload._id) {
                        return action.payload;
                    }
                    return memory;
                }),
            };
        default:
            return state;
    }
}
