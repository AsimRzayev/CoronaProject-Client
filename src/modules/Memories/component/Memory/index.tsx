import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMemories, IMemoryProps } from "../../../../interface";
import { getMemories } from "../../actions";
import MemoryItem from "./MemoryItem";
import useStyles from "./styles";
const Memory: React.FC<IMemoryProps> = ({ setCurrentId }) => {
    const data = useSelector((state: any) => state.memories);
    const dispatch = useDispatch();
    useEffect(() => {
        getMemories(dispatch);
    }, [dispatch]);
    const classes = useStyles();
    return (
        <Grid
            className={classes.mainContainer}
            container
            alignItems="stretch"
            spacing={3}
        >
            {data.status === "SUCCESS" && data ? (
                data.data.map((memory: IMemories) => (
                    <Grid key={memory._id} item xs={12} sm={12} md={6} lg={6}>
                        <MemoryItem
                            memory={memory}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                ))
            ) : (
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ textAlign: "center", marginTop: 20 }}
                >
                    <CircularProgress size={100} />
                </Grid>
            )}
        </Grid>
    );
};
export default Memory;
