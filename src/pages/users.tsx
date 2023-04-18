import NavGrid from '@/components/NavGrid/NavGrid'
import Navigation from '@/components/Navigation/Navigation'
import { StyledTableWrapperDiv } from '@/components/StyledComponents'
import Layout from '@/components/Templates/Layout/Layout'
import { RegistrationType } from '@/types'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

type UsersPropsType = {
  user: any, users: [RegistrationType]
}

const users = (props: UsersPropsType) => {
  const rows: GridRowsProp = props.users.map((user, i) => ({ id: i + 1, userId: user.id, username: user.username }))

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 225 },
  ];
  return (
    <Layout>
      <NavGrid>
        <Navigation active='users' id={props.user.id} />
      </NavGrid>
      <StyledTableWrapperDiv>
        <DataGrid rows={rows} columns={columns} />
      </StyledTableWrapperDiv>
    </Layout >
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
