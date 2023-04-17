import { ReactNode } from "react"

export type RegistrationType = {
    username: string
    password: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    number: string
    id?: number
    confirm_password?: string | undefined
}

export type ContactType = {
    name: string
    email: string
    number?: string
    message: string
}

export type CreateUserType = {
    username: string
    password: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    number: string
}

export type LoginType = {
    username: string
    password: string
}

export interface NavigationProps {
    active: string
    id?: number
}

export type ErrorProps = {
    message: string | undefined,
    checker: string | false | undefined
}

export type FormItemProps = {
    name: string
    value: string
    handleChange: any
    label: string
}

export interface GridItemWithPasswordType {
    handleChange: any,
    value: string | undefined,
    message: any,
    checker: any,
    name: string,
    id: string,
    label: string
}

export type FormPropsType = {
    handleChange: any,
    value: string,
    label: string,
    message: any,
    checker: any,
    name: string,
    handleBlur: any,
    md: number
}

export type childrenType = {
    children: ReactNode
}

export type CustomHeaderType = {
    text: string
}

export type ThemeType = {
    theme: boolean
}
export interface propsUserDataType {
    user: {
        name: string,
        email: string,
        id: number
    }
}

export interface userDataType {
        name: string,
        email: string,
        id: number
}