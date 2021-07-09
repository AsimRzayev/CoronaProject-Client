import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { getMemories } from "../../modules/Memories/actions";
const Paginate: React.FC<any> = ({ page }) => {
    const { numberOfPages } = useSelector((state: any) => state.memories);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (page) dispatch(getMemories(page));
    }, [page, dispatch]);
    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/memories?page=${item.page}`}
                />
            )}
        />
    );
};

export default Paginate;
