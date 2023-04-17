import { FormItemProps } from '@/types'
import { InputLabel, OutlinedInput } from '@mui/material'

const FormItem = ({ name, handleChange, value, label }: FormItemProps): JSX.Element => {
    return (
        <>
            <InputLabel htmlFor={name}>{`${label}`}</InputLabel>
            <OutlinedInput label={label} name={name} id={name} fullWidth onChange={handleChange} value={value || ''} />
        </>
    )
}

export default FormItem