import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";

import { useHistory, useParams } from "react-router-dom";
import { memoriesService } from "../../../service";

import { CircularProgress, Divider, Paper } from "@material-ui/core";
import moment from "moment";
import { getMemoriesBySearch, updateMemoryViewer } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { IRecomendedMemories } from "../../../../../interface";
import CommentSection from "./CommentSection";

export default function MemorySingle() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const memories = useSelector((state: any) => state.memories);
    const { id } = useParams<{ id: string }>();
    const [memory, setMemory] = useState({
        title: "",
        name: "",
        description: "",
        createdAt: "",
        viewcount: 0,
        memorytype: "",
        selectedFile: "",
        creator: "",
        tags: "",
    });

    useEffect(() => {
        dispatch(
            updateMemoryViewer({
                memoryId: id,
            })
        );
        memoriesService.getMemoriesById(id).then(({ data }) => {
            setMemory(data);
        });
    }, [id, dispatch]);
    useEffect(() => {
        dispatch(getMemoriesBySearch({ search: "", category: "ALL" }));
    }, [dispatch]);

    if (memory.title === "") {
        return (
            <div
                style={{
                    margin: "100px auto",
                    width: 200,
                    borderRadius: "15px",
                }}
            >
                <CircularProgress size={150} />;
            </div>
        );
    }
    const openMemory = (_id: string) => history.push(`/memories/${_id}`);
    const recommendedMemories = memories.data?.filter(
        (memorData: any) => memorData.memorytype !== memory.memorytype
    );
    return (
        <Paper
            style={{
                padding: "20px",
                margin: "10px 20px",
                borderRadius: "15px",
            }}
            elevation={6}
        >
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">
                        {memory.title}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        color="textSecondary"
                        component="h2"
                    >
                        {memory.tags.split(",").map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {memory.description}
                    </Typography>
                    <Typography variant="h6">
                        Created by: {memory.name}
                    </Typography>
                    <Typography variant="body1">
                        {moment(memory.createdAt).fromNow()}
                    </Typography>

                    <Divider style={{ margin: "20px 0" }} />
                    <CommentSection memory={memory} />
                    <Divider style={{ margin: "20px 0" }} />
                </div>
                <div className={classes.imageSection}>
                    <img
                        className={classes.media}
                        src={
                            memory.selectedFile ||
                            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt={memory.name}
                    />
                </div>
            </div>
            {memories.status !== "SUCCESS" && <CircularProgress />}
            {recommendedMemories.length > 0 && (
                <div className={classes.section} style={{ marginTop: 20 }}>
                    <Typography gutterBottom variant="h5" color="primary">
                        You might also like:
                    </Typography>
                    <Divider />
                    <div className={classes.recommendedMemories}>
                        {recommendedMemories.length > 0 &&
                            recommendedMemories
                                .slice(0, 4)
                                .map(
                                    ({
                                        title,
                                        name,
                                        description,
                                        likes,
                                        selectedFile,
                                        _id,
                                    }: IRecomendedMemories) => (
                                        <div
                                            style={{
                                                margin: "20px",
                                                width: "30%",
                                                cursor: "pointer",
                                                padding: "0px 20px ",
                                            }}
                                            onClick={() => openMemory(_id)}
                                            key={_id}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                            >
                                                {title}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle2"
                                            >
                                                {name}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle2"
                                            >
                                                {description.slice(0, 100)}
                                                ...
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                style={{ color: "blue" }}
                                            >
                                                Likes: {likes.length}
                                            </Typography>
                                            <img
                                                src={selectedFile}
                                                alt={title}
                                                width="200px"
                                            />
                                        </div>
                                    )
                                )}
                    </div>
                </div>
            )}
        </Paper>
    );
}
