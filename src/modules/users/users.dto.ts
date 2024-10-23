export type SignUpUserDto = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    alias?: string,
}

export type LoginUserDto = {
    email: string,
    password: string
}