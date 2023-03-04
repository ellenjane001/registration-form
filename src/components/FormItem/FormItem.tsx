import { InputLabel, OutlinedInput } from '@mui/material'

type Props = {
    name: string
    value: string
    handleChange:any
    label:string
}
const FormItem = ({ name,handleChange,value,label }: Props) => {
    return (
        <>
            <InputLabel htmlFor={name}>{`${label}`}</InputLabel>
            <OutlinedInput label={label} name={name} id={name} fullWidth onChange={handleChange} value={value}/>
        </>
    )
}

export default FormItem