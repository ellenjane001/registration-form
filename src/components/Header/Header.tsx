import Head from 'next/head'
import React from 'react'
type Props = {
    title?: string
}

const Header = (props: Props) => {
    return (
        <Head>
            <title>Profile</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Header