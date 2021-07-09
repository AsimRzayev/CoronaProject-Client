import { HttpClient } from "../../api/httpClient";
import { ISignIn } from "../../interface";

class AuthService extends HttpClient {
    constructor() {
        super("https://covid-memories-api.herokuapp.com");
    }

    async signin(userData: ISignIn) {
        return this.postAuth("auth/signin", userData);
    }
    async signup(userData: any) {
        return this.postAuth("auth/signup", userData);
    }
}
export const authService = new AuthService();
