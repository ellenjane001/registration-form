import styled from '@emotion/styled'
import { TableCell } from '@mui/material'

const StyledDiv = styled(TableCell)(({scope,component})=>({overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}))

export default StyledDiv