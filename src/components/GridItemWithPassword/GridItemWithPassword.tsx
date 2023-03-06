import React, { useState } from 'react'
import { Grid, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from '@mui/material'
import Error from '../Error/Error'
import { VisibilityOff, Visibility } from '@mui/icons-material'

const GridItemWithPassword = ({ handleChange, value, message, checker }: { handleChange: any, value: string, message: any, checker: any }) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Grid item>
            <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput id='password' name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} value={value} endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                } />
                <Error message={message} checker={checker} />
            </FormControl>
        </Grid>
    )
}

export default GridItemWithPassword