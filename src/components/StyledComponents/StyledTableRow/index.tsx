import styled from '@emotion/styled'
import { TableRow } from '@mui/material'
import React from 'react'

const StyledTableRow = styled(TableRow)(({key})=>({'&:last-child td, &:last-child th': { border: 0 } }))
export default StyledTableRow