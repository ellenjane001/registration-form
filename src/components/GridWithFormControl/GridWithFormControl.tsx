import React, { useEffect, useState } from 'react'
import { Grid, FormControl, CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'

type FormPropsType = {
    handleChange: any, value: string, label: string, message: any, checker: any
}
const FormItemComponent = dynamic(() => import('@/components/FormItem/FormItem'), { loading: () => <CircularProgress /> })
const ErrorComponent = dynamic(() => import('@/components/Error/Error'), { loading: () => <CircularProgress /> })
const GridWithFormControl = ({ handleChange, value, label, message, checker }: FormPropsType) => {
    const [showComponent, setShowComponent] = useState(true);
    useEffect(() => {
        setShowComponent(true);
    }, []);
    return (
        <Grid item>
            <FormControl fullWidth>
                {showComponent && <FormItemComponent name='number' handleChange={handleChange} value={value || ''} label={label} />}
                {showComponent && <ErrorComponent message={message} checker={checker} />}
            </FormControl>
        </Grid>
    )
}

export default GridWithFormControl