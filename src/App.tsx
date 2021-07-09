import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    RouteProps,
} from "react-router-dom";
import Auth from "./modules/Auth/components";
import Navbar from "./components/Navbar";
import { Home } from "./modules/Home";
import { Memories } from "./modules/Memories/component";
import MemorySingle from "./modules/Memories/component/Memory/MemorySingle";
interface IProtectedProps extends RouteProps {}
const ProtectedRoute: React.FC<IProtectedProps> = ({ ...rest }) => {
    const isAuthenticated = localStorage.getItem("profile");
    if (isAuthenticated) return <Redirect to="/" />;

    return <Route {...rest} />;
};
const PrivateRoute: React.FC<IProtectedProps> = ({ ...rest }) => {
    const data = JSON.parse(localStorage.getItem("profile") || "{}");
    if (data?.result?.email !== "admin@code.az") return <Redirect to="/" />;

    return <Route {...rest} />;
};

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/memories" exact>
                    <Memories />
                </Route>
                <Route path="/memories/search" exact>
                    <Memories />
                </Route>
                <Route path="/memories/:id" exact>
                    <MemorySingle />
                </Route>
                <ProtectedRoute path="/auth" exact component={Auth} />
                <PrivateRoute path="/memories" exact component={Memories} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
