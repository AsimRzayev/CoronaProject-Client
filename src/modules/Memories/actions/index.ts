import { IFilter, IMemories } from "../../../interface";
import { MEMORIES_ACTIONS } from "../actions/consts";
import { memoriesService } from "../service";
export const getMemories = (page: any) => async (dispatch: any) => {
    dispatch({
        type: MEMORIES_ACTIONS.GET_MEMORIES,
    });
    const {
        data: { data, currentPage, numberOfPage },
    } = await memoriesService.getMemories(page);
    dispatch({
        type: MEMORIES_ACTIONS.GET_MEMORIES_SUCCESS,
        payload: { data, currentPage, numberOfPage },
    });
};
export const getMemoriesBySearch =
    (filterQuery: IFilter) => async (dispatch: any) => {
        try {
            dispatch({
                type: MEMORIES_ACTIONS.GET_MEMORIES,
            });
            await memoriesService
                .getMemoriesBySearch(filterQuery)
                .then(({ data }) => {
                    dispatch({
                        type: MEMORIES_ACTIONS.GET_MEMORIES_BY_SEARCH,
                        payload: data,
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

export const updateMemoryViewer = (body: any) => async (dispatch: any) => {
    memoriesService.updateMemoriesView(body);
};

export const createMemory = (memory: IMemories) => async (dispatch: any) => {
    try {
        dispatch({
            type: MEMORIES_ACTIONS.CREATE_MEMORIES,
        });
        await memoriesService.createMemories(memory).then(({ data }) => {
            dispatch({
                type: MEMORIES_ACTIONS.CREATE_MEMORIES_SUCCESS,
                payload: data,
            });
        });
    } catch (error) {
        console.log(error.message);
    }
};
export const updateMemory =
    (id: string, memory: IMemories) => async (dispatch: any) => {
        try {
            const { data } = await memoriesService.updateMemory(id, memory);
            dispatch({
                type: MEMORIES_ACTIONS.UPDATE_MEMORIES,
                payload: { ...data, name: memory.name },
            });
        } catch (error) {
            console.log(error.message);
        }
    };
export const deleteMemory = (id: string) => async (dispatch: any) => {
    dispatch({
        type: MEMORIES_ACTIONS.DELETE_MEMORIES,
    });
    try {
        await memoriesService.deleteMemory(id);

        dispatch({
            type: MEMORIES_ACTIONS.DELETE_MEMORIES_SUCCESS,
            payload: id,
        });
    } catch (error) {
        console.log(error.message);
    }
};
export const likeMemory = (id: string) => async (dispatch: any) => {
    const user = JSON.parse(localStorage.getItem("profile") || "{}").token;

    try {
        const { data } = await memoriesService.likeMemory(id, user);

        dispatch({ type: MEMORIES_ACTIONS.LIKE_MEMORIES, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentMemories =
    (value: any, id: string) => async (dispatch: any) => {
        try {
            const { data } = await memoriesService.commentMemory(value, id);

            dispatch({
                type: MEMORIES_ACTIONS.COMMENT_MEMORIES,
                payload: data,
            });

            return data.comments;
        } catch (error) {
            console.log(error);
        }
    };
