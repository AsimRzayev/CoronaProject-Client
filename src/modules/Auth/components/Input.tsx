import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
interface IInputsProps {
    name: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    half?: any;
    autoFocus?: boolean;
    type?: string;
    handleShowPassword?: () => void;
}
const Input: React.FC<IInputsProps> = ({
    name,
    handleChange,
    label,
    half,
    autoFocus,
    type,
    handleShowPassword,
}) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={
                name === "password"
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton onClick={handleShowPassword}>
                                      {type === "password" ? (
                                          <Visibility />
                                      ) : (
                                          <VisibilityOff />
                                      )}
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }
                    : {
                          endAdornment: null,
                      }
            }
        />
    </Grid>
);

export default Input;
