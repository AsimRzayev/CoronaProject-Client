import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    media: {
        borderRadius: "20px",
        width: "100%",
        backgroundSize: "cover",
        maxHeight: "600px",
    },
    card: {
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
            flexDirection: "column",
        },
    },
    section: {
        borderRadius: "20px",
        margin: "10px",
        flex: 8,
    },
    imageSection: {
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
        },
        flex: 6,
    },
    recommendedMemories: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    loadingPaper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        height: "39vh",
    },
    commentsOuterContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    commentsInnerContainer: {
        height: "300px",
        overflowY: "auto",
        marginRight: "30px",
        width: "50%",
    },
}));
