import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { IInfoboxProps } from "../../interface";
export const InfoBox: React.FC<IInfoboxProps> = ({
    title,
    isRed,
    isGrey,
    active,
    cases,
    total,
    isloading,
    ...props
}) => {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox-selected"} ${
                isRed && "infoBox-red"
            } ${isGrey && "infoBox-grey"}`}
        >
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                <h2
                    className={`infoBox_cases ${
                        !isRed && "infoBox_cases--green"
                    } ${isGrey && "infoBox_cases--grey"}`}
                >
                    {isloading ? (
                        <i className="fa fa-cog fa-spin fa-fw" />
                    ) : (
                        cases
                    )}
                </h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
};
