import React, { useState } from "react";
import {
    TextField,
    Typography,
    Paper,
    Button,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { getMemoriesBySearch } from "../../actions";
import { IFormProps } from "../../../../interface";
import Pagination from "../../../../components/Pagination";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Filter: React.FC<IFormProps> = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const query = useQuery();
    const page = query.get("page") || 1;

    const [filter, setFilter] = useState({
        search: "",
        category: "ALL",
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
    const filterMemory = (e: any) => {
        e.preventDefault();
        if (filter.search.trim()) {
            dispatch(getMemoriesBySearch(filter));
            history.push(
                `/memories/search?searchQuery=${
                    filter.search || "none"
                }&category=${filter.category}`
            );
        } else {
            dispatch(getMemoriesBySearch(filter));
            history.push(
                `/memories/search?searchQuery=none&category=${filter.category}`
            );
        }
    };
    const clearFilter = () => {
        setFilter({
            search: "",
            category: "ALL",
        });
        history.push(`/memories/search?searchQuery=none&category=ALL`);
    };
    return (
        <>
            <Paper className={classes.paper}>
                <Typography variant="h6" color="secondary">
                    Filter
                </Typography>

                <form
                    onSubmit={(e) => filterMemory(e)}
                    style={{ marginTop: 20 }}
                >
                    <TextField
                        name="search"
                        variant="outlined"
                        label="Search Memories"
                        fullWidth
                        value={filter.search}
                        onChange={(e) =>
                            setFilter({ ...filter, search: e.target.value })
                        }
                    />

                    <FormControl component="fieldset" style={{ marginTop: 20 }}>
                        <FormLabel component="legend">Category</FormLabel>
                        <RadioGroup
                            aria-label="Category"
                            name="Category"
                            value={filter.category}
                            onChange={(e) => {
                                setFilter({
                                    ...filter,
                                    category: e.target.value,
                                });
                            }}
                        >
                            <FormControlLabel
                                value="ALL"
                                control={<Radio />}
                                label="ALL"
                            />
                            {memoryTpes.map((memoryType) => (
                                <FormControlLabel
                                    key={memoryType.value}
                                    value={memoryType.value}
                                    control={<Radio />}
                                    label={memoryType.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: 10, marginRight: 10 }}
                    >
                        Filter
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={clearFilter}
                        style={{ marginTop: 10 }}
                    >
                        Clear
                    </Button>
                </form>
            </Paper>{" "}
            {!filter.search && filter.category === "ALL" && (
                <Paper className={classes.pagination} elevation={6}>
                    <Pagination page={page} />
                </Paper>
            )}
        </>
    );
};

export default Filter;
