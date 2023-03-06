export type RegistrationType = {
    username: string
    password: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    number: string
    id?:number
}

export type ContactType={
    name:string
    email:string
    number:string
    message:string
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

