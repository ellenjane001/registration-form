import { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const Profile = () => {
    const { data: session } = useSession()
    const [content, setContent] = useState()
    const router = useRouter()
    // Fetch content from protected route
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/examples/protected")
            const json = await res.json()
            if (json.content) {
                setContent(json.content)
            }
        }
        fetchData()
    }, [session])


    // If no session exists, display access denied message
    if (!session) {
        console.log(session)
        // router.push('./')
        // return (
        //     <h1>Access denied <button type="button" onClick={(e) => signIn()}>Sign In</button></h1>
        // )
    }

    // If session exists, display content
    return (
        <>
            <h1>Protected Page</h1>
            <p>
                <strong>{content ?? "\u00a0"}</strong>
            </p>
            {!session && <Button variant='contained' onClick={(e) => signOut()}>Logout</Button>}

        </>
    )
}

export default Profile