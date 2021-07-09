import { Grid, Grow } from "@material-ui/core";
import React, { useState } from "react";
import Form from "./Form";
import Filter from "./Filter";
import Memory from "./Memory";
import "./index.css";
export const Memories = () => {
    const [currentId, setCurrentId] = useState("");

    return (
        <div style={{ width: "98%", margin: "20px auto" }}>
            <Grow in>
                <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={2} className="filterForm">
                        <Filter
                            setCurrentId={setCurrentId}
                            currentId={currentId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Memory setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Form
                            setCurrentId={setCurrentId}
                            currentId={currentId}
                        />
                    </Grid>
                </Grid>
            </Grow>
        </div>
    );
};
