import React, { useEffect, useState } from 'react'
import { Grid, FormControl, CircularProgress, InputLabel, OutlinedInput } from '@mui/material'
import dynamic from 'next/dynamic'
import { FormPropsType } from '@/types'

const ErrorComponent = dynamic(() => import('@/components/Error/Error'), { loading: () => <CircularProgress /> })

const GridWithFormControl = ({ name, handleChange, value, label, message, checker, handleBlur, md }: FormPropsType): JSX.Element => {
    const [showComponent, setShowComponent] = useState<boolean>(true)

    useEffect(() => {
        setShowComponent(true);
    }, []);

    return (
        <Grid item md={md} xs={12}>
            <FormControl fullWidth>
                <InputLabel htmlFor={name}>{`${label}`}</InputLabel>
                <OutlinedInput label={label} name={name} id={name} fullWidth onChange={handleChange} onBlur={handleBlur} value={value || ''} />
                {showComponent && <ErrorComponent message={message} checker={checker} />}
            </FormControl>
        </Grid>
    )
}

export default GridWithFormControl