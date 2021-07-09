import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentMemories } from "../../../actions";
import { Link } from "react-router-dom";
interface IMemory {
    memory: any;
}
const CommentSection: React.FC<IMemory> = ({ memory }) => {
    const user = JSON.parse(localStorage.getItem("profile") || "{}");
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const [comments, setComments] = useState(memory?.comments);
    const classes = useStyles();
    const commentsRef: any = useRef<HTMLDivElement>(null);

    const handleComment = async () => {
        const newComments: any = await dispatch(
            commentMemories(`${user?.result?.name}: ${comment}`, memory._id)
        );

        setComment("");
        setComments(newComments);
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h5" color="primary">
                        Comments
                    </Typography>
                    {comments?.map((c: any, idx: number) => (
                        <Typography key={idx} gutterBottom variant="subtitle1">
                            <strong>{c.split(": ")[0]}-</strong>
                            {c.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name ? (
                    <div style={{ width: "50%" }}>
                        <Typography gutterBottom variant="h6">
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <br />
                        <Button
                            style={{ marginTop: "10px" }}
                            fullWidth
                            disabled={!comment.length}
                            color="primary"
                            variant="contained"
                            onClick={handleComment}
                        >
                            Comment
                        </Button>
                    </div>
                ) : (
                    <div style={{ width: "50%" }}>
                        <Typography
                            variant="h5"
                            align="center"
                            style={{ padding: "20px 10px" }}
                        >
                            Sign in to write comment <br />
                            <Link
                                color="primary"
                                to="/auth"
                                style={{
                                    textDecoration: "none",
                                    marginLeft: 20,
                                }}
                            >
                                LOGIN
                            </Link>
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
