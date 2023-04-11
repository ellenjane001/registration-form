import Layout from '@/components/Templates/Layout/Layout'
import Navigation from '@/components/Navigation/Navigation'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import cookie from 'cookie'
import { RegistrationType } from '@/types'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const users = (props: { user: any, users: [RegistrationType] }) => {
  return (
    <Layout>
      <Navigation active='users' id={props.user.id} />
      <Grid container justifyContent="center" sx={{ padding: '20px' }}>
        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.users.map(user => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default users

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const session = await getSession(context)
    const { registration } = cookie.parse(context.req.headers.cookie!)

    const result = await axios.post(`${process.env.NEXT_PUBLIC_API}users/get-all`, { cookie: registration })
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    } else {
      return { props: { ...session, users: [...result.data] } }
    }
  } catch (e) {
    return { props: { data: {} } }
  }
}