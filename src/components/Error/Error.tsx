import { ErrorProps } from '@/types'
import { FormHelperText, Skeleton } from '@mui/material'
import { StyledSkeleton } from '../StyledComponents'

const Error = (props: ErrorProps): JSX.Element => {
    const { checker, message } = props
    return (
        <>
            {checker ? (
                <FormHelperText error>{message}</FormHelperText>
            ) : <FormHelperText><StyledSkeleton animation={false}/></FormHelperText>}
        </>
    )
}

export default Error