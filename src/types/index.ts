export type RegistrationType = {
    username: string
    password: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    number: string
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
export type FailedLoginType = {
    failedLogin: number,
    lastLoginAttempt: string,
    account: {
        username: string
        password: string
    }
}
