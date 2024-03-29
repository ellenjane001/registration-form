import React, { useState } from 'react'
import { Grid, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from '@mui/material'
import Error from '../Error/Error'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { GridItemWithPasswordType } from '@/types'


const GridItemWithPassword = ({ handleChange, value, message, checker, name, id, label }: GridItemWithPasswordType): JSX.Element => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

    return (
        <Grid item>
            <FormControl fullWidth>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInput id={id} name={name} label={label} onChange={handleChange} type={showPassword ? 'text' : 'password'} value={value} autoComplete="true" endAdornment={
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