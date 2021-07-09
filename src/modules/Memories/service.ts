import { HttpClient } from "../../api/httpClient";
import { IFilter, IMemories } from "../../interface";

class MemoriesService extends HttpClient {
    constructor() {
        super("https://covid-memories-api.herokuapp.com");
    }

    async getMemories(page: any) {
        return this.get(`memories?page=${page}`);
    }
    async getMemoriesById(id: string) {
        return this.get(`memories/memory/${id}`);
    }
    async getMemoriesBySearch(query: IFilter) {
        return this.get(
            `memories/search?searchQuery=${query.search}&category=${query.category}`
        );
    }
    async createMemories(body: IMemories) {
        return this.post("memories/add", body);
    }
    async updateMemory(id: string, body: any) {
        return this.patch(`memories/updateMemory/${id}`, body);
    }
    async updateMemoriesView(body: any) {
        return this.patch("memories/updateViewer", body);
    }
    async deleteMemory(id: string) {
        return this.delete(`memories/deleteMemory/${id}`);
    }
    async likeMemory(id: string, user: string) {
        return this.patchLike(`memories/${id}/likeMemory`, user);
    }
    async commentMemory(value: any, id: any) {
        return this.post(`memories/${id}/commentMemory`, { value });
    }
}
export const memoriesService = new MemoriesService();
