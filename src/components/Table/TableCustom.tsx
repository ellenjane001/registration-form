import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { ReactNode } from 'react'

const TableCustom = ({ children }: { children: ReactNode }) => {
    return (
        <TableContainer component={Paper} >
            <Table aria-label="simple table" sx={{tableLayout:"fixed",whiteSpace:"nowrap" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableCustom