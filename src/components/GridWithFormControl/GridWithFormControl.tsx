import React, { useEffect, useState } from 'react'
import { Grid, FormControl, CircularProgress, InputLabel, OutlinedInput } from '@mui/material'
import dynamic from 'next/dynamic'

type FormPropsType = {
    handleChange: any, value: string, label: string, message: any, checker: any,name:string
}
const ErrorComponent = dynamic(() => import('@/components/Error/Error'), { loading: () => <CircularProgress /> })

const GridWithFormControl = ({ name ,handleChange, value, label, message, checker }: FormPropsType) => {
    const [showComponent, setShowComponent] = useState(true);
    useEffect(() => {
        setShowComponent(true);
    }, []);
    return (
        <Grid item>
            <FormControl fullWidth>
                <InputLabel htmlFor={name}>{`${label}`}</InputLabel>
                <OutlinedInput label={label} name={name} id={name} fullWidth onChange={handleChange} value={value || ''} />
                {showComponent && <ErrorComponent message={message} checker={checker} />}
            </FormControl>
        </Grid>
    )
}

export default GridWithFormControl