import axios from "axios";

export class HttpClient {
    baseUrl;

    constructor(url: string) {
        this.baseUrl = url;
    }

    async get(url: string) {
        return await axios.get(`${this.baseUrl}/${url}`);
    }
    async getById(url: string, id: string) {
        return await axios.get(`${this.baseUrl}/${url}/${id}`);
    }
    async patch(url: string, body: any) {
        return await axios.patch(`${this.baseUrl}/${url}`, body, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("profile") || "").token
                }`,
            },
        });
    }
    async patchLike(url: string, user: string) {
        return await axios.patch(`${this.baseUrl}/${url}`, user, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("profile") || "").token
                }`,
            },
        });
    }
    async patchView(url: string, user: string) {
        return await axios.patch(`${this.baseUrl}/${url}`, user);
    }
    async post(url: string, body: any) {
        return await axios.post(`${this.baseUrl}/${url}`, body, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("profile") || "").token
                }`,
            },
        });
    }
    async postAuth(url: string, body: any) {
        return await axios.post(`${this.baseUrl}/${url}`, body);
    }
    async delete(url: string) {
        return await axios.delete(`${this.baseUrl}/${url}`, {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("profile") || "").token
                }`,
            },
        });
    }
}
