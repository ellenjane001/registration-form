import { childrenType } from '@/types'
import { Grid } from '@mui/material'

const NavGrid = ({ children }: childrenType): JSX.Element => {
    return (
        <Grid item width="100%">{children}</Grid>
    )
}

export default NavGrid