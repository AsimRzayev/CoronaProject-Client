import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Avatar } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { withRouter, useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "./covid19_logo.png";
import { AUTH_ACTIONS } from "../../modules/Auth/actions/consts";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.down("xs")]: {
            flexGrow: 1,
        },
    },
    headerOptions: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
    },
    profile: {
        display: "flex",
        justifyContent: "space-between",
        width: "340px",
        marginLeft: "100px",
    },
    mobileProfile: {
        width: "100%",
        marginLeft: 10,
    },
    userName: {
        display: "flex",
        alignItems: "center",
        marginRight: 20,
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));
interface Props {
    history: {
        push(url: string): void;
    };
}
const Navbar = () => {
    const history = useHistory<Props>();
    const location = useLocation();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (pageURL: string) => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    const handleButtonClick = (pageURL: string) => {
        history.push(pageURL);
    };

    const menuItems = [
        {
            menuTitle: "Home",
            pageURL: "/",
        },
        {
            menuTitle: "Memories",
            pageURL: "/memories",
        },
        {
            menuTitle: "Login",
            pageURL: "/auth",
        },
    ];
    const dispatch = useDispatch();
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile") || "{}")
    );

    const logout = () => {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });

        history.push("/auth");

        setUser({
            result: {
                name: "",
                imageUrl: "",
            },
        });
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("profile") || "{}");
        setUser(userData);
    }, [location]);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">
                            <img
                                src={Logo}
                                width={100}
                                height={40}
                                alt={"Logo"}
                            />
                        </Link>
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                aria-label="menu"
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuItems.map((menuItem) => {
                                    const { menuTitle, pageURL } = menuItem;
                                    if (menuTitle === "Login") {
                                        if (Object.keys(user).length !== 0)
                                            return (
                                                <div
                                                    className={
                                                        classes.mobileProfile
                                                    }
                                                >
                                                    <Button
                                                        style={{ color: "red" }}
                                                        onClick={logout}
                                                    >
                                                        Logout
                                                    </Button>
                                                </div>
                                            );
                                        else
                                            return (
                                                <Button
                                                    style={{
                                                        marginLeft: 10,
                                                        color: "red",
                                                    }}
                                                    onClick={() =>
                                                        handleButtonClick(
                                                            "/auth"
                                                        )
                                                    }
                                                >
                                                    LOGIN
                                                </Button>
                                            );
                                    }
                                    return (
                                        <MenuItem
                                            style={{ color: "red" }}
                                            onClick={() =>
                                                handleMenuClick(pageURL)
                                            }
                                        >
                                            {menuTitle}
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </>
                    ) : (
                        <div className={classes.headerOptions}>
                            <Button
                                color="primary"
                                style={{ fontSize: 18, marginRight: 10 }}
                                onClick={() => handleButtonClick("/")}
                            >
                                HOME
                            </Button>
                            <Button
                                color="primary"
                                style={{ fontSize: 18 }}
                                onClick={() => handleButtonClick("/memories")}
                            >
                                Memories
                            </Button>

                            {Object.keys(user).length !== 0 ? (
                                <div className={classes.profile}>
                                    <Avatar
                                        className={classes.purple}
                                        alt={user?.result.name}
                                        src={user?.result.imageUrl}
                                    >
                                        {user?.result.name.charAt(0)}
                                    </Avatar>
                                    <Typography
                                        className={classes.userName}
                                        variant="h6"
                                    >
                                        {user?.result.name}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ marginLeft: 30 }}
                                    onClick={() => handleButtonClick("/auth")}
                                >
                                    LOGIN
                                </Button>
                            )}
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Navbar);
