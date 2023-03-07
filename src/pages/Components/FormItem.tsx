import { InputLabel, OutlinedInput } from '@mui/material'

type Props = {
    name: string
    value: string
    handleChange: any
    label: string
    handleBlur:any
}
const FormItem = ({ name, handleChange, value, label,handleBlur }: Props) => {
    return (
        <>
            <InputLabel htmlFor={name}>{`${label}`}</InputLabel>
            <OutlinedInput label={label} name={name} id={name} fullWidth onChange={handleChange} onBlur={handleBlur} value={value} />
        </>
    )
}

export default FormItem