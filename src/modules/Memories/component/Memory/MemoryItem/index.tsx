import React, { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Divider,
} from "@material-ui/core/";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { deleteMemory, likeMemory } from "../../../actions";
interface Iprops {
    memory: any;
    setCurrentId: (value: string) => void;
}
const MemoryItem: React.FC<Iprops> = ({ memory, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile") || "{}");
    const [likes, setLikes] = useState(memory?.likes);

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedMemory = memory.likes.find((like: any) => like === userId);

    const handleLike = () => {
        dispatch(likeMemory(memory._id));
        if (hasLikedMemory) {
            setLikes(memory.likes.filter((id: string) => id !== userId));
        } else {
            setLikes([...memory.likes, userId]);
        }
    };
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like: any) => like === userId) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp;Like
            </>
        );
    };
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={
                    memory.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                title={memory.title}
            />
            <div className={classes.overlay}>
                <Typography variant="h6">{memory.name}</Typography>
                <Typography variant="body2">
                    {moment(memory.createdAt).fromNow()}
                </Typography>
            </div>
            {(user?.result?.googleId === memory?.creater ||
                user?.result?._id === memory?.creater ||
                user?.result?.email === "admin@code.az") && (
                <div className={classes.overlay2}>
                    <Button
                        style={{ color: "white" }}
                        size="small"
                        onClick={() => setCurrentId(memory._id || "")}
                    >
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h2"
                >
                    {memory.tags.split(",").map((tag: string) => ` #${tag} `)}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h2"
                >
                    <Button
                        size="large"
                        style={{ marginTop: -12 }}
                        color="primary"
                    >
                        <VisibilityIcon fontSize="small" /> &nbsp;
                        {memory.viewcount}
                    </Button>
                </Typography>
            </div>
            <Divider style={{ marginBottom: 10 }} />
            <Typography
                className={classes.title}
                gutterBottom
                variant="h5"
                component="h2"
            >
                <Link
                    to={`/memories/${memory._id}`}
                    color="primary"
                    style={{ textDecoration: "none" }}
                >
                    {memory.title}
                </Link>
            </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {memory.description.slice(0, 200)}...
                </Typography>
            </CardContent>
            <Divider />
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    disabled={!user?.result}
                    onClick={handleLike}
                >
                    <Likes />
                </Button>
                {(user?.result?.googleId === memory?.creater ||
                    user?.result?._id === memory?.creater ||
                    user?.result?.email === "admin@code.az") && (
                    <Button
                        size="small"
                        color="secondary"
                        onClick={() => dispatch(deleteMemory(memory._id))}
                    >
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
                <Link
                    to={`/memories/${memory._id}`}
                    color="primary"
                    style={{ textDecoration: "none" }}
                >
                    <Button size="small" color="primary">
                        <FingerprintIcon fontSize="small" /> Read More
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default MemoryItem;
