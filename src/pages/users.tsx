import NavGrid from '@/components/NavGrid/NavGrid'
import Navigation from '@/components/Navigation/Navigation'
import TableCustom from '@/components/Table/TableCustom'
import Layout from '@/components/Templates/Layout/Layout'
import { RegistrationType } from '@/types'
import { Grid, TableCell, TableRow } from '@mui/material'
import axios from 'axios'
import cookie from 'cookie'
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
    const { registration } = cookie.parse(context.req.headers.cookie!)
    const result = await axios.post(`${process.env.NEXT_PUBLIC_API}users/get-all`, { cookie: registration })
    // const keycloak = await axios.get(``)
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