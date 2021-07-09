import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
    Input,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { createMemory, updateMemory } from "../../actions";
import { IFormProps } from "../../../../interface";

const Form: React.FC<IFormProps> = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const memoriesData = useSelector((state: any) =>
        currentId
            ? state.memories.data.find((p: any) => p._id === currentId)
            : null
    );
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile") || "{}");

    const [memoryData, setMemoryData] = useState({
        name: "",
        title: "",
        memorytype: "",
        description: "",
        tags: "",
        selectedFile: "",
    });
    const memoryTpes = [
        {
            value: "MEMORY",
            label: "MEMORY",
        },
        {
            value: "ADVICE",
            label: "ADVICE",
        },
    ];

    useEffect(() => {
        if (memoriesData) {
            setMemoryData(memoriesData);
        }
    }, [memoriesData]);

    const clear = () => {
        setMemoryData({
            name: "",
            title: "",
            memorytype: "",
            description: "",
            tags: "",
            selectedFile: "",
        });
        setCurrentId("");
    };
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        let base64 = (await convertBase64(file)) as string;
        setMemoryData({ ...memoryData, selectedFile: base64 });
    };

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (currentId !== "") {
            dispatch(
                updateMemory(currentId, {
                    ...memoryData,
                    name: memoryData.name,
                })
            );
        } else {
            dispatch(createMemory({ ...memoryData, name: user?.result?.name }));
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography
                    variant="h6"
                    align="center"
                    style={{ padding: "20px 10px" }}
                >
                    Please sign in to create your own memories and like other's
                    memories
                    <Link
                        color="primary"
                        to="/auth"
                        style={{ textDecoration: "none", marginLeft: 20 }}
                    >
                        LOGIN
                    </Link>
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={(e: any) => handleSubmit(e)}
            >
                <Typography variant="h6" color="secondary">
                    {"Memory Form"}
                </Typography>

                <TextField
                    name="memorytype"
                    select
                    label="Post type"
                    fullWidth
                    value={memoryData.memorytype}
                    onChange={(e) =>
                        setMemoryData({
                            ...memoryData,
                            memorytype: e.target.value,
                        })
                    }
                    variant="outlined"
                >
                    {memoryTpes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={memoryData.title}
                    onChange={(e) =>
                        setMemoryData({
                            ...memoryData,
                            title: e.target.value,
                        })
                    }
                />
                <TextField
                    name="description"
                    variant="outlined"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={memoryData.description}
                    onChange={(e) =>
                        setMemoryData({
                            ...memoryData,
                            description: e.target.value,
                        })
                    }
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    onChange={(e) =>
                        setMemoryData({ ...memoryData, tags: e.target.value })
                    }
                    value={memoryData.tags}
                    helperText="Please write coma separated"
                />

                <Input
                    type="file"
                    style={{ marginLeft: 10 }}
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        uploadImage(e);
                    }}
                />

                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    {currentId ? "Edit" : "Add"} Memory
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
