import NavGrid from '@/components/NavGrid/NavGrid'
import Navigation from '@/components/Navigation/Navigation'
import { StyledDiv, StyledTableRow } from '@/components/StyledComponents'
import Layout from '@/components/Templates/Layout/Layout'
import TableCustom from '@/components/Templates/Table/TableCustom'
import { RegistrationType } from '@/types'
import { Grid, TableCell } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

type UsersPropsType = {
  user: any, users: [RegistrationType]
}

const users = (props: UsersPropsType) => {
  return (
    <Layout>
      <NavGrid>
        <Navigation active='users' id={props.user.id} />
      </NavGrid>
      <Grid item md={12} xs={12}>
        <Grid container justifyContent="center" sx={{ padding: '20px' }}>
          <Grid item>
            <TableCustom>
              {props.users.map(user => (
                <StyledTableRow key={user.id}>
                  <StyledDiv component="th" scope="row">
                    {user.id}
                  </StyledDiv>
                  <TableCell>{user.username}</TableCell>
                </StyledTableRow>
              ))}
            </TableCustom>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default users

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const session = await getSession(context)
    const result = await axios.post(`${process.env.NEXT_PUBLIC_API}users/get-all`)
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    } else {
      return { props: { ...session, users: Object.values(result.data) } }
    }
  } catch (e) {
    return { props: {} }
  }
}
