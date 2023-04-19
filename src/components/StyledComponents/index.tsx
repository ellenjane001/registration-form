import useAppStore from "@/utils/AppStore";
import styled from "@emotion/styled";
import Image from "next/image";
import { Paper, Skeleton, TableCell, TableRow } from "@mui/material";

const StyledDiv = styled(TableCell)(({ scope, component }) => ({ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }))
const StyledFormControl = styled("input")({})
const StyledIElement = styled('i')({ fontSize: '10px' })
const StyledPaper = styled(Paper)(({ theme, square }) => ({ padding: 20, height: "100vh" }))
const StyledPaper2 = styled(Paper)(({ theme }) => ({ padding: 30 }))
const StyledTableRow = styled(TableRow)(({ key }) => ({ '&:last-child td, &:last-child th': { border: 0 } }))
const StyledImage = styled(Image)(({ src, alt, priority, height }) => ({ objectFit: "contain", width: "100%", height: height }))
const StyledSkeleton = styled(Skeleton)(({ animation }) => {
    const theme = useAppStore(state => state.theme)
    return { backgroundColor: theme ? "#1E1E1E" : "#fff" }
})

const StyledTableWrapperDiv = styled('div')({ height: 350, padding: 20 })

export { StyledDiv, StyledFormControl, StyledIElement, StyledPaper, StyledPaper2, StyledTableRow, StyledSkeleton, StyledImage, StyledTableWrapperDiv };